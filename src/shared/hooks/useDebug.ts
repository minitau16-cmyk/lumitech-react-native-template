import { useMMKVDevTools } from '@rozenite/mmkv-plugin';
import { useNetworkActivityDevTools } from '@rozenite/network-activity-plugin';
import { useTanStackQueryDevTools } from '@rozenite/tanstack-query-plugin';
import { queryClient } from 'api';
import { RouteService, storage } from 'services';
import { useReactNavigationDevTools } from '@rozenite/react-navigation-plugin';

export const useDebug = () => {
  useTanStackQueryDevTools(queryClient);

  useNetworkActivityDevTools();

  useReactNavigationDevTools({ ref: RouteService.navigationRef });

  useMMKVDevTools({
    storages: [storage],
  });
};
