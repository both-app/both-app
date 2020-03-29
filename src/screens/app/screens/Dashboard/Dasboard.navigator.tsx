import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { DashboardScreen } from './DashboardScreen'

const Stack = createStackNavigator()

const ROUTES = {
  DASHBOARD: 'Dasboard',
}

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.DASHBOARD} headerMode="none">
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
    </Stack.Navigator>
  )
}
