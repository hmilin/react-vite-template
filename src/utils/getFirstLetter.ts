import { pinyin } from 'pinyin-pro';

// 获取字符串首拼
const getFirstLetter = (name: string) =>
  pinyin(name, { pattern: 'first', toneType: 'none', type: 'array' })?.[0]?.toUpperCase();

export default getFirstLetter;
