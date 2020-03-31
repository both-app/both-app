import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SelectScreen } from './screens/Select'
import { CreateNavigator } from './screens/Create'

const Stack = createStackNavigator()

const ROUTES = {
  SELECT: 'Select',
  CREATE: 'Create',
}

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.SELECT}
    headerMode="none"
    screenOptions={{ gestureEnabled: false }}
  >
    <Stack.Screen name={ROUTES.SELECT} component={SelectScreen} />
    <Stack.Screen name={ROUTES.CREATE} component={CreateNavigator} />
  </Stack.Navigator>
)
