import { useValue } from '@legendapp/state/react';
import { languageStore$ } from './store';

export const useCurrentLanguage = () => {
  return useValue(languageStore$.currentLanguage);
};

export const useCurrentLanguage$ = () => {
  return languageStore$.currentLanguage;
};
