import Config from 'react-native-config';
import { getServices } from 'services';
import { resetAllStores } from 'stores';
import axios from 'axios';
import { Mutex } from 'async-mutex';
import { createAxiosClient } from './http-client';

export const refreshMutex = new Mutex();

export const axiosBaseQuery = axios.create({ baseURL: '' });

const {
  exception: exceptionService,
  toast: toastService,
  eventEmitter,
} = getServices();

export const baseQuery = createAxiosClient({
  baseURL: Config.API_URL || '',
  getToken: () => {
    return '';
  },
  onError: error => {
    toastService.onDanger({
      title: exceptionService.errorResolver(error),
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
        toastService.onDanger({
          title: exceptionService.errorResolver(error),
        });

        eventEmitter.emit('LOGOUT');

        resetAllStores();
      } finally {
        release();
      }
    }
  },
});
