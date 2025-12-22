import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Theme } from '@react-navigation/native';
import { LightColors } from 'themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const Stack =
  createNativeStackNavigator<ReactNavigation.RootParamList>();

export const Tab = createBottomTabNavigator<ReactNavigation.RootParamList>();

export const navigationTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: LightColors.basic_100,
    border: 'transparent',
  },
  fonts: {
    ...DefaultTheme.fonts,
  },
};
