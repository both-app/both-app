import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ProfilScreen } from './ProfilScreen'

export const Stack = createStackNavigator()

export const ProfilNavigator = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{ gestureEnabled: false }}
    mode="modal"
  >
    <Stack.Screen component={ProfilScreen} name="Profil" />
  </Stack.Navigator>
)
