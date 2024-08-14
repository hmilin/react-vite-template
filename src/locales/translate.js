import { translate } from '@vitalets/google-translate-api';
import fs from 'fs';
import { HttpProxyAgent } from 'http-proxy-agent';
import zhText from '../locales/zh/translation.json' assert  { type: "json" };
import enText from '../locales/en/translation.json' assert  { type: "json" };
import { get } from 'lodash-es';
import { set } from 'lodash-es';
import path from 'path';

const enFilePath = path.resolve('./src/locales/en/translation.json');

const args = process.argv.slice(2);
const proxy = args[0]?.match(/(?<=proxy=).*/)[0] || 'http://127.0.0.1:7890';
const timeoutMs = 5000;

async function translateText(sourceText, to) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  const fetchOptions = {
    agent: new HttpProxyAgent(proxy),
    signal: ac.signal,
  };
  try {
    const { text } = await translate(sourceText, { fetchOptions, to, });
    return text
  } finally {
    clearTimeout(timer);
  }
}

async function traverseTexts(translations, key = '') {
  for (const k in translations) {
    const value = translations[k]
    const fullKey = `${key ? `${key}.` : ''}${k}`
    if (typeof value === 'string') {
      // 只翻译新增的配置
      if (get(enText, fullKey) !== void 0) {
        continue
      }
      console.log('translating:', value)
      const translated = await translateText(value, 'en')
      set(enText, fullKey, translated)
    } else {
      await traverseTexts(value, fullKey)
    }
  }
}

function saveEnTexts() {
  const jsonContent = JSON.stringify(enText, null, 2);
  fs.writeFileSync(enFilePath, jsonContent, 'utf8');
  console.log('Translation completed and saved to locales/en/translation.json');
}

await traverseTexts(zhText)
saveEnTexts()