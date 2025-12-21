import { useRoute, RouteProp } from '@react-navigation/native';

export const useTypedRoute = <T extends keyof ReactNavigation.RootParamList>(
  _: T,
): RouteProp<ReactNavigation.RootParamList, T> => {
  return useRoute<RouteProp<ReactNavigation.RootParamList, T>>();
};
