import { observable, syncState } from '@legendapp/state';
import { LanguageStore } from './types';
import { persistObservable } from '../lib';

const initialState: LanguageStore = {
  currentLanguage: 'en',
};

export const languageStore$ = observable<LanguageStore>(initialState);

persistObservable(languageStore$, 'LANGUAGE_STORAGE');

const languageStoreSyncState$ = syncState(languageStore$);

export const resetLanguageStorePersist = async () => {
  await languageStoreSyncState$.resetPersistence();

  languageStore$.set({
    currentLanguage: 'en',
  });
};
