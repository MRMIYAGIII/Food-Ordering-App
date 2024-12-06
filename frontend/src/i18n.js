import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/locales/en.json';
import fr from './i18n/locales/fr.json';
import es from './i18n/locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
