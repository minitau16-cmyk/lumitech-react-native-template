import Config from 'react-native-config';
import { eventEmitter, ExceptionService, ToastService } from 'services';
import { resetAllStores } from 'stores';
import axios from 'axios';
import { Mutex } from 'async-mutex';
import { createAxiosClient } from './http-client';

export const refreshMutex = new Mutex();

export const axiosBaseQuery = axios.create({ baseURL: '' });

export const baseQuery = createAxiosClient({
  baseURL: Config.API_URL || '',
  getToken: () => {
    return '';
  },
  onError: error => {
    ToastService.onDanger({
      title: ExceptionService.errorResolver(error),
    });
  },
  onUnauthorized: async error => {
    if (refreshMutex.isLocked()) {
      await refreshMutex.waitForUnlock();
    } else {
      const release = await refreshMutex.acquire();

      try {
        // your tokens request here
      } catch {
        ToastService.onDanger({
          title: ExceptionService.errorResolver(error),
        });

        eventEmitter.emit('LOGOUT');

        resetAllStores();
      } finally {
        release();
      }
    }
  },
});
