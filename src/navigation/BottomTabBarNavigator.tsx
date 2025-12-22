import React from 'react';
import { Text } from 'react-native';
import { IconName } from '@react-native-vector-icons/icomoon';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Icon } from 'ui';
import { useTranslation } from 'react-i18next';
import { useServices } from 'providers';
import { Tab } from './lib';
import { AlertsNavigator, ProfileNavigator } from './tabs';

type BottomTabBarRoutes = Pick<
  ReactNavigation.RootParamList,
  'ALERTS_NAVIGATOR' | 'PROFILE_NAVIGATOR'
>;

type BottomTabBarKeys = keyof BottomTabBarRoutes;

const tabIcons: Record<BottomTabBarKeys, IconName> = {
  ALERTS_NAVIGATOR: 'alerts',
  PROFILE_NAVIGATOR: 'account',
};

export const BottomTabBarNavigator: React.FC = () => {
  const { theme } = useUnistyles();
  const { route } = useServices();

  const { t } = useTranslation();

  const titles: Record<BottomTabBarKeys, string> = {
    ALERTS_NAVIGATOR: t('screens.alerts'),
    PROFILE_NAVIGATOR: t('screens.account'),
  };

  const handleLongPress = (routeName: keyof ReactNavigation.RootParamList) => {
    route.navigate(routeName);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.basic_1000,
        tabBarInactiveTintColor: theme.colors.black,
        headerShown: false,
        tabBarItemStyle: styles.tabBarItemStyle,
        lazy: true,
        tabBarLabel: () => (
          <Text style={styles.text}>
            {titles[route.name as BottomTabBarKeys]}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? 'basic_400' : 'basic_300';

          return (
            <Icon
              name={tabIcons[route.name as BottomTabBarKeys]}
              size={22}
              color={iconColor}
            />
          );
        },
      })}
      backBehavior="history"
      screenListeners={({ route }) => ({
        tabLongPress: () => handleLongPress(route.name),
      })}>
      <Tab.Screen
        name="ALERTS_NAVIGATOR"
        component={AlertsNavigator}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="PROFILE_NAVIGATOR"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create(theme => ({
  tabBarItemStyle: {
    height: 42,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tabBarBadgeStyle: {
    top: -8,
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 14,
    width: 16,
    height: 16,
    borderRadius: 8,
    minWidth: 0,
  },
  text: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    fontFamily: theme.fonts.Medium,
    color: theme.colors.black,
  },
}));
