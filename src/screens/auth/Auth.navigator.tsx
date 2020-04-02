import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SelectScreen } from './screens/Select'
import { FormNavigator } from './screens/Form'

const Stack = createStackNavigator()

const ROUTES = {
  SELECT: 'Select',
  FORM: 'Form',
}

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.SELECT}
    headerMode="none"
    screenOptions={{ gestureEnabled: false }}
  >
    <Stack.Screen name={ROUTES.SELECT} component={SelectScreen} />
    <Stack.Screen name={ROUTES.FORM} component={FormNavigator} />
  </Stack.Navigator>
)
