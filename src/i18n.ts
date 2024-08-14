import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';

const defaultLg = localStorage.getItem('locale') || 'zh-CN';
i18n.use(initReactI18next).init({
  fallbackLng: defaultLg,
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    'en-US': {
      translation: en,
    },
    'zh-CN': {
      translation: zh,
    },
  },
});

export default i18n;
