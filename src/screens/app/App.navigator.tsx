import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { DashboardNavigator } from './Dashboard'
import { RelationNavigator } from './Relation'

import { Icon } from '../../library/components/Icon'
import { TabBar } from './components/TabBar/TabBar'

const Tab = createBottomTabNavigator()

const ROUTES = {
  DASHBOARD: 'Dashboard',
  RELATION: 'Relation',
}

export const AppNavigator = () => (
  <Tab.Navigator initialRouteName={ROUTES.DASHBOARD} tabBar={TabBar}>
    <Tab.Screen
      name={ROUTES.DASHBOARD}
      component={DashboardNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="dashboard" width={size} height={size} fill={color} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.RELATION}
      component={RelationNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Icon iconName="relation" width={size} height={size} fill={color} />
        ),
      }}
    />
  </Tab.Navigator>
)
