import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { DashboardNavigator } from './screens/Dashboard'
import { TabBar } from './components/TabBar'
import { Icon } from 'library/components/Icon'

const Tab = createBottomTabNavigator()

const ROUTES = {
  DASHBOARD: 'Dashboard',
}

export const AppNavigator = () => (
  <Tab.Navigator initialRouteName={ROUTES.DASHBOARD} tabBar={TabBar}>
    <Tab.Screen
      name={ROUTES.DASHBOARD}
      component={DashboardNavigator}
      options={{
        tabBarVisible: false,
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="list" width={size} height={size} style={{ color }} />
        ),
      }}
    />
  </Tab.Navigator>
)
