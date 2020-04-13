import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Icon } from 'library/components/Icon'
import { TabBar } from './components/TabBar'

import { DashboardNavigator } from './screens/Dashboard'
import { ProfilNavigator } from './screens/Profil'
import { LeaderboardScreen } from './screens/Leaderboard'

const Tab = createBottomTabNavigator()

const ROUTES = {
  DASHBOARD: 'Dashboard',
  PROFIL: 'Profil',
  LEADERBOARD: 'Leaderboard',
}

export const AppNavigator = () => (
  <Tab.Navigator initialRouteName={ROUTES.DASHBOARD} tabBar={TabBar}>
    <Tab.Screen
      name={ROUTES.PROFIL}
      component={ProfilNavigator}
      options={{
        tabBarVisible: true,
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="user" width={size} height={size} style={{ color }} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.DASHBOARD}
      component={DashboardNavigator}
      options={{
        tabBarVisible: true,
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="list" width={size} height={size} style={{ color }} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.LEADERBOARD}
      component={LeaderboardScreen}
      options={{
        tabBarVisible: true,
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="award" width={size} height={size} style={{ color }} />
        ),
      }}
    />
  </Tab.Navigator>
)
