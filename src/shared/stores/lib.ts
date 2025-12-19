import { syncObservable } from '@legendapp/state/sync';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import type { ObservableParam } from '@legendapp/state';
import type { SyncedOptions } from '@legendapp/state/sync';
import { MMKVStorageKey } from 'react-native-mmkv';
import { resetAuthStorePersist } from './auth/store';

export const resetAllStores = async () => {
  await resetAuthStorePersist();
};

export const persistObservable = <T>(
  store$: ObservableParam<T>,
  key: MMKVStorageKey,
  options?: Omit<SyncedOptions<T>, 'persist'>,
) => {
  return syncObservable(store$, {
    ...options,
    persist: {
      name: key,
      plugin: ObservablePersistMMKV,
    },
  });
};
