import { languageStore$ } from './store';
import { Language } from './types';

export const languageStoreActions = {
  setLanguage: (language: Language) => {
    languageStore$.currentLanguage.set(language);
  },
};
