import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

export type RouteType = keyof typeof Routes;

type NavigatorWithTitle<T extends {}> = NavigatorScreenParams<T> & {
  title?: string;
};

export type AlertsNavigatorParamList = {
  [Routes.ALERTS]: { title?: string };
};

export type ProfileNavigatorParamList = {
  [Routes.PROFILE]: { title?: string };
};

export type BottomTabBarNavigatorParamList = {
  [Routes.ALERTS_NAVIGATOR]: NavigatorWithTitle<AlertsNavigatorParamList>;
  [Routes.PROFILE_NAVIGATOR]: NavigatorWithTitle<ProfileNavigatorParamList>;
};

export type MainNavigatorParamList = {
  [Routes.BOTTOM_TAB_BAR_NAVIGATOR]: NavigatorWithTitle<BottomTabBarNavigatorParamList>;
};

export type AuthNavigatorParamList = {
  [Routes.AUTH]: { title?: string };
};

export type RootStackParamList = {
  [Routes.MAIN_NAVIGATOR]: NavigatorWithTitle<MainNavigatorParamList>;
  [Routes.AUTH_NAVIGATOR]: NavigatorWithTitle<AuthNavigatorParamList>;
} & MainNavigatorParamList &
  BottomTabBarNavigatorParamList &
  AlertsNavigatorParamList &
  ProfileNavigatorParamList &
  AuthNavigatorParamList;

export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.PROFILE
>;
