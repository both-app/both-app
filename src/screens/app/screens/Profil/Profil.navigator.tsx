import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ProfilScreen } from './ProfilScreen'
import { SettingsScreen } from './screens/Settings'
import { TheTeamScreen } from './screens/TheTeam'

export const Stack = createStackNavigator()

export const ProfilNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen component={ProfilScreen} name="Profil" />
    <Stack.Screen component={SettingsScreen} name="Settings" />
    <Stack.Screen component={TheTeamScreen} name="TheTeam" />
  </Stack.Navigator>
)
