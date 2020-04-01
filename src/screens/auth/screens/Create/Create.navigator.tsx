import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { NameScreen } from './screens/Name'
import { GenderScreen } from './screens/Gender'
import { JoinOrCreateScreen } from './screens/JoinOrCreate'
import { CodeScreen } from './screens/Code'
import { BirthdayScreen } from './screens/Birthday'

import { CreateContextProvider } from './Create.context'

export const Stack = createStackNavigator()

export const CreateNavigator = () => (
  <CreateContextProvider>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen component={NameScreen} name="Name" />
      <Stack.Screen component={GenderScreen} name="Gender" />
      <Stack.Screen component={JoinOrCreateScreen} name="JoinOrCreateScreen" />
      <Stack.Screen component={CodeScreen} name="Code" />
      <Stack.Screen component={BirthdayScreen} name="Birthday" />
    </Stack.Navigator>
  </CreateContextProvider>
)
