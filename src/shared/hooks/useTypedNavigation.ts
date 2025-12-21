import {
  NavigationProp,
  NavigationState,
  useNavigation,
} from '@react-navigation/native';

export const useTypedNavigation = <
  T extends
    keyof ReactNavigation.RootParamList = keyof ReactNavigation.RootParamList,
>(
  _: T,
) => {
  return useNavigation<
    Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
      getState(): NavigationState | undefined;
    }
  >();
};
