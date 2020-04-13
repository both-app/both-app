import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { FormContextProvider } from './Form.context'
import { FirstNameScreen } from './screens/FirstName'
import { GenderScreen } from './screens/Gender'
import { JoinOrCreateScreen } from './screens/JoinOrCreate'
import { CodeScreen } from './screens/Code'
import { BirthDateScreen } from './screens/BirthDate'
import { PushNotificationScreen } from './screens/PushNotification'

export const Stack = createStackNavigator()

export const FormNavigator = () => (
  <FormContextProvider>
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={FirstNameScreen} name="FirstName" />
      <Stack.Screen component={GenderScreen} name="Gender" />
      <Stack.Screen component={JoinOrCreateScreen} name="JoinOrCreate" />
      <Stack.Screen component={CodeScreen} name="Code" />
      <Stack.Screen component={BirthDateScreen} name="BirthDate" />
      <Stack.Screen
        component={PushNotificationScreen}
        name="PushNotification"
      />
    </Stack.Navigator>
  </FormContextProvider>
)
