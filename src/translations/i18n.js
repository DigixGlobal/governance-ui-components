import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from '@digix/gov-ui/translations';

const namespaces = ['Dissolution', 'Snackbar'];

const options = {
  resources,
  fallbackLng: 'en',
  debug: process.env.ENVIRONMENT === 'development',
  ns: namespaces,
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options, () => {
    i18n.t('Dissolution');
    i18n.t('Snackbar');
  });

export default i18n;
