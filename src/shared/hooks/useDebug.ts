import { useNetworkActivityDevTools } from '@rozenite/network-activity-plugin';
import { useTanStackQueryDevTools } from '@rozenite/tanstack-query-plugin';
import { queryClient } from 'api';
import { useServices } from 'providers';
import { useReactNavigationDevTools } from '@rozenite/react-navigation-plugin';

export const useDebug = () => {
  const { route } = useServices();

  useTanStackQueryDevTools(queryClient);

  useNetworkActivityDevTools();

  useReactNavigationDevTools({ ref: route.navigationRef });
};
