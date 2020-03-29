import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { DashboardScreen } from './DashboardScreen'
import { AddTaskScreen } from './screens/AddTask'

const Stack = createStackNavigator()

const ROUTES = {
  DASHBOARD: 'Dasboard',
  ADD_TASK: 'AddTask',
}

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.DASHBOARD}
      headerMode="none"
      mode="modal"
    >
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={ROUTES.ADD_TASK} component={AddTaskScreen} />
    </Stack.Navigator>
  )
}
