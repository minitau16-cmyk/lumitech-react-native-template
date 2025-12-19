import {
  NavigationProp,
  NavigationState,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from 'services';

export const useTypedNavigation = <
  T extends keyof RootStackParamList = keyof RootStackParamList,
>(
  _: T,
) => {
  return useNavigation<
    Omit<NavigationProp<RootStackParamList>, 'getState'> & {
      getState(): NavigationState | undefined;
    }
  >();
};
