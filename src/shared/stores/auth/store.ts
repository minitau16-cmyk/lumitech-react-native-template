import { observable, syncState } from '@legendapp/state';
import { AuthStore } from './types';
import { persistObservable } from '../lib';

const initialState: AuthStore = {
  refreshToken: '',
  token: '',
};

export const authStore$ = observable<AuthStore>(initialState);

persistObservable(authStore$, 'AUTH_STORAGE');

const authStoreSyncState$ = syncState(authStore$);

export const resetAuthStorePersist = async () => {
  await authStoreSyncState$.resetPersistence();

  authStore$.set({
    refreshToken: '',
    token: '',
  });
};
