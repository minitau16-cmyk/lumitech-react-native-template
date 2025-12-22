import { DefaultTheme, Theme } from '@react-navigation/native';
import { useServices } from 'providers';
import { useEffect } from 'react';
import { useUnistyles } from 'react-native-unistyles';
import { resetAllStores, useCurrentTheme, useToken } from 'stores';

export const useRootNavigator = () => {
  const token = useToken();

  const currentTheme = useCurrentTheme();

  const { eventEmitter } = useServices();

  const { theme } = useUnistyles();

  const navigationTheme = {
    dark: currentTheme === 'dark',
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primary_background,
      border: 'transparent',
      primary: theme.colors.primary,
      card: theme.colors.primary_background,
      text: theme.colors.secondary,
      notification: theme.colors.primary,
    },
    fonts: {
      ...DefaultTheme.fonts,
      ...theme.fonts,
    },
  } satisfies Theme;

  useEffect(() => {
    const listener = eventEmitter.addListener('LOGOUT', async () => {
      await resetAllStores();
    });

    return () => {
      listener.removeListener('LOGOUT');
    };
  }, []);

  return {
    currentTheme,
    token,
    navigationTheme,
  };
};
