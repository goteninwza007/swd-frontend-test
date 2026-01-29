"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enLocalization } from '@/locales/en';
import { thLocalization } from '@/locales/th';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enLocalization,
    },
    th: {
      translation: thLocalization,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n;