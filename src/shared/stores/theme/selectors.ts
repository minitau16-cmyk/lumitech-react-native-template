import { useValue } from '@legendapp/state/react';
import { themeStore$ } from './store';

export const useCurrentTheme = () => {
  return useValue(themeStore$.currentTheme);
};

export const useCurrentTheme$ = () => {
  return themeStore$.currentTheme;
};
