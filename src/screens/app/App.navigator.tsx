import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { DashboardNavigator } from './Dashboard'
import { RelationNavigator } from './Relation'
import { Icon } from '../../library/components/Icon'
import { TabBar } from './components/TabBar/TabBar'

const Tab = createBottomTabNavigator()

export const AppNavigator = () => (
  <Tab.Navigator initialRouteName="Dashboard" tabBar={TabBar}>
    <Tab.Screen
      name="Dashboard"
      component={DashboardNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="dashboard" width={size} height={size} fill={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Relation"
      component={RelationNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="relation" width={size} height={size} fill={color} />
        ),
      }}
    />
  </Tab.Navigator>
)
