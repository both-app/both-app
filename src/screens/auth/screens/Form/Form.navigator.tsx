import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { NameScreen } from './screens/Name'
import { GenderScreen } from './screens/Gender'
import { SpecialGenderScreen } from './screens/SpecialGender'
import { JoinOrCreateScreen } from './screens/JoinOrCreate'
import { CodeScreen } from './screens/Code'
import { BirthdayScreen } from './screens/Birthday'

import { AuthFormContextProvider } from '../../AuthForm.context'

export const Stack = createStackNavigator()

export const FormNavigator = () => (
  <AuthFormContextProvider>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen component={NameScreen} name="Name" />
      <Stack.Screen component={GenderScreen} name="Gender" />
      <Stack.Screen component={SpecialGenderScreen} name="SpecialGender" />
      <Stack.Screen component={JoinOrCreateScreen} name="JoinOrCreate" />
      <Stack.Screen component={CodeScreen} name="Code" />
      <Stack.Screen component={BirthdayScreen} name="Birthday" />
    </Stack.Navigator>
  </AuthFormContextProvider>
)
