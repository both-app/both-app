import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Icon } from 'library/components/Icon'
import { TabBar } from './components/TabBar'

import { HomeNavigator } from './screens/Home'
import { ProfilNavigator } from './screens/Profil'
import { LeaderboardScreen } from './screens/Leaderboard'

const Tab = createBottomTabNavigator()

const ROUTES = {
  HOME: 'Home',
  PROFIL: 'Profil',
  LEADERBOARD: 'Leaderboard',
}

export const AppNavigator = () => (
  <Tab.Navigator initialRouteName={ROUTES.HOME} tabBar={TabBar}>
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
      name={ROUTES.HOME}
      component={HomeNavigator}
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
