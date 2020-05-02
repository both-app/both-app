import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Icon } from 'library/components/Icon'
import { TabBar } from './components/TabBar'

import { HomeScreen } from './screens/Home'
import { RelationScreen } from './screens/Relation'
import { AddTaskNavigator } from './screens/AddTask'
import { LeaderboardScreen } from './screens/Leaderboard'
import { SettingsNavigator } from './screens/Settings'

const Tab = createBottomTabNavigator()

const ROUTES = {
  HOME: 'Home',
  RELATION: 'Relation',
  ADD_TASK: 'AddTask',
  LEADERBOARD: 'Leaderboard',
  SETTINGS: 'Settings',
}

export const AppNavigator = () => (
  <Tab.Navigator initialRouteName={ROUTES.HOME} tabBar={TabBar}>
    <Tab.Screen
      name={ROUTES.HOME}
      component={HomeScreen}
      options={{
        tabBarVisible: true,
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="home" width={size} height={size} style={{ color }} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.RELATION}
      component={RelationScreen}
      options={{
        tabBarVisible: true,
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="users" width={size} height={size} style={{ color }} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.ADD_TASK}
      component={AddTaskNavigator}
      options={{
        tabBarVisible: false,
        tabBarIcon: ({ size }) => (
          <Icon
            iconName="plus"
            width={size}
            height={size}
            style={{ color: 'white' }}
          />
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
    <Tab.Screen
      name={ROUTES.SETTINGS}
      component={SettingsNavigator}
      options={{
        tabBarVisible: true,
        tabBarIcon: ({ size, color }) => (
          <Icon
            iconName="settings"
            width={size}
            height={size}
            style={{ color }}
          />
        ),
      }}
    />
  </Tab.Navigator>
)
