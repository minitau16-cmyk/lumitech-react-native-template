import { themeStore$ } from './store';
import { Theme } from './types';

export const themeStoreActions = {
  setTheme: (theme: Theme) => {
    themeStore$.currentTheme.set(theme);
  },
};
