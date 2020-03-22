import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { DashboardNavigator } from './Dashboard'
import { RelationScreen } from './Relation'

const Tab = createBottomTabNavigator()

export const ConnectedNavigator = () => (
  <Tab.Navigator initialRouteName="Dashboard">
    <Tab.Screen name="Dashboard" component={DashboardNavigator} />
    <Tab.Screen name="Relation" component={RelationScreen} />
  </Tab.Navigator>
)
