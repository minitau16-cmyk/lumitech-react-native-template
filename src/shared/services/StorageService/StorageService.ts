import { createMMKV } from 'react-native-mmkv';
import { StorageKey } from './models';

export const storage = createMMKV();

export const StorageService = {
  setItem: (key: StorageKey, value: string | number | boolean) => {
    storage.set(key, value);

    return Promise.resolve(true);
  },
  getItem: (key: StorageKey) => {
    const value = storage.getString(key);

    return Promise.resolve(value);
  },
  removeItem: (key: StorageKey) => {
    storage.remove(key);

    return Promise.resolve();
  },
  removeAllItems: () => {
    storage.clearAll();
  },
};
