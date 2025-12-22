import { useServices } from 'providers';
import { UnistylesRuntime } from 'react-native-unistyles';
import { useCurrentTheme, themeStoreActions } from 'stores';

export const useDynamicTheme = () => {
  const theme = useCurrentTheme();

  const { route } = useServices();

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    UnistylesRuntime.setTheme(newTheme);

    themeStoreActions.setTheme(newTheme);
  };

  const onBackPress = () => {
    route.goBack();
  };

  return {
    switchTheme,
    onBackPress,
    theme,
  };
};
