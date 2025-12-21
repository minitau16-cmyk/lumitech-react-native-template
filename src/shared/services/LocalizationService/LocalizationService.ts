import i18n, { i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'translations/en.json';
import { Injectable } from '../lib';

export type Language = 'en';

export interface LocalizationService {
  changeLanguage(newLanguage: Language): Promise<void>;
  getCurrentLanguage(): Language;
  getAvailableLanguages(): Language[];
  readonly i18n: I18nInstance;
}

@Injectable()
export class LocalizationServiceImpl implements LocalizationService {
  readonly i18n: I18nInstance;

  constructor() {
    const resources = {
      en: { translation: en },
    };

    this.i18n = i18n.use(initReactI18next);

    this.i18n.init({
      compatibilityJSON: 'v4',
      resources,
      fallbackLng: 'en',
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  }

  async changeLanguage(newLanguage: Language): Promise<void> {
    await this.i18n.changeLanguage(newLanguage);
  }

  getCurrentLanguage(): Language {
    return this.i18n.language as Language;
  }

  getAvailableLanguages(): Language[] {
    return ['en'];
  }
}
