import { observable, syncState } from '@legendapp/state';
import { ThemeStore } from './types';
import { persistObservable } from '../lib';

const initialState: ThemeStore = {
  currentTheme: 'light',
};

export const themeStore$ = observable<ThemeStore>(initialState);

persistObservable(themeStore$, 'THEME_STORAGE');

const themeStoreSyncState$ = syncState(themeStore$);

export const resetThemeStorePersist = async () => {
  await themeStoreSyncState$.resetPersistence();

  themeStore$.set({
    currentTheme: 'light',
  });
};
