import type { StorageKey } from '../services';

declare module 'react-native-mmkv' {
  type MMKVStorageKey = StorageKey;
}
