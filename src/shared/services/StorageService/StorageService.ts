import { createMMKV, MMKV } from 'react-native-mmkv';
import { Injectable } from '../lib';
import { StorageKey } from './models';

export interface StorageService {
  setItem(key: StorageKey, value: string | number | boolean): Promise<boolean>;
  getItem(key: StorageKey): Promise<string | undefined>;
  removeItem(key: StorageKey): Promise<void>;
  removeAllItems(): void;
}

@Injectable()
export class StorageServiceImpl implements StorageService {
  private readonly storage: MMKV;

  constructor() {
    this.storage = createMMKV();
  }

  setItem(key: StorageKey, value: string | number | boolean): Promise<boolean> {
    this.storage.set(key, value);

    return Promise.resolve(true);
  }

  getItem(key: StorageKey): Promise<string | undefined> {
    const value = this.storage.getString(key);

    return Promise.resolve(value);
  }

  removeItem(key: StorageKey): Promise<void> {
    this.storage.remove(key);

    return Promise.resolve();
  }

  removeAllItems(): void {
    this.storage.clearAll();
  }
}
