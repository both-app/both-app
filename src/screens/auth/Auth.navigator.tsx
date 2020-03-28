import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SelectScreen } from './screens/Select'
import { CreateNavigator } from './screens/Create'
import { JoinNavigator } from './screens/Join'

const Stack = createStackNavigator()

const ROUTES = {
  SELECT: 'Select',
  CREATE: 'Create',
  JOIN: 'Join',
}

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.SELECT}
    headerMode="none"
    screenOptions={{ gestureEnabled: false }}
  >
    <Stack.Screen name={ROUTES.SELECT} component={SelectScreen} />
    <Stack.Screen name={ROUTES.CREATE} component={CreateNavigator} />
    <Stack.Screen name={ROUTES.JOIN} component={JoinNavigator} />
  </Stack.Navigator>
)
