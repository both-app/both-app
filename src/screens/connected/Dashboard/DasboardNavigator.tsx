import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { DashboardScreen } from './DashboardScreen'

const Stack = createStackNavigator()

export const DashboardNavigator = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  </Stack.Navigator>
)
