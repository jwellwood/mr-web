import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

const LOCALE_STORAGE_KEY = 'selected_language';

const saved = typeof window !== 'undefined' ? localStorage.getItem(LOCALE_STORAGE_KEY) : null;
const defaultLng =
  saved || (typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en');

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLng === 'es' ? 'es' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', lng => {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lng);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
});

export default i18n;
