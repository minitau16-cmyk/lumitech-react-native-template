import { UnistylesRuntime } from 'react-native-unistyles';
import { RouteService } from 'services';
import { useCurrentTheme, themeStoreActions } from 'stores';

export const useDynamicTheme = () => {
  const theme = useCurrentTheme();

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    UnistylesRuntime.setTheme(newTheme);

    themeStoreActions.setTheme(newTheme);
  };

  const onBackPress = () => {
    RouteService.goBack();
  };

  return {
    switchTheme,
    onBackPress,
    theme,
  };
};
