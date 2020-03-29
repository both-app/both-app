import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { DashboardNavigator } from './screens/Dashboard'
import { TabBar } from './components/TabBar'
import { View } from 'react-native'
import { Icon } from 'library/components/Icon'

const Tab = createBottomTabNavigator()

const ROUTES = {
  LOVE: 'Love',
  DASHBOARD: 'Dashboard',
  AWARD: 'Award',
}

export const AppNavigator = () => (
  <Tab.Navigator initialRouteName={ROUTES.DASHBOARD} tabBar={TabBar}>
    <Tab.Screen
      name={ROUTES.LOVE}
      component={View}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="heart" width={size} height={size} style={{ color }} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.DASHBOARD}
      component={DashboardNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="list" width={size} height={size} style={{ color }} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.AWARD}
      component={View}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="award" width={size} height={size} style={{ color }} />
        ),
      }}
    />
  </Tab.Navigator>
)
