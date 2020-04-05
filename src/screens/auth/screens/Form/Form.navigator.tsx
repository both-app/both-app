import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { FirstNameScreen } from './screens/FirstName'
import { GenderScreen } from './screens/Gender'
import { JoinOrCreateScreen } from './screens/JoinOrCreate'
import { CodeScreen } from './screens/Code'
import { BirthDateScreen } from './screens/BirthDate'

export const Stack = createStackNavigator()

export const FormNavigator = () => (
  <Stack.Navigator headerMode="none" screenOptions={{ gestureEnabled: false }}>
    <Stack.Screen component={FirstNameScreen} name="FirstName" />
    <Stack.Screen component={GenderScreen} name="Gender" />
    <Stack.Screen component={JoinOrCreateScreen} name="JoinOrCreate" />
    <Stack.Screen component={CodeScreen} name="Code" />
    <Stack.Screen component={BirthDateScreen} name="BirthDate" />
  </Stack.Navigator>
)
