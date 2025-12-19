import { useValue } from '@legendapp/state/react';
import { authStore$ } from './store';

export const useToken = () => {
  return useValue(authStore$.token);
};
