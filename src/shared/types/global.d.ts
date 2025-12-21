import { RootStackParamList } from 'services/RouteService';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
