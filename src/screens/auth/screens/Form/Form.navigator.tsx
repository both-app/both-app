import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { FormContextProvider } from './Form.context'
import { FirstNameScreen } from './screens/FirstName'
import { JoinOrCreateScreen } from './screens/JoinOrCreate'
import { CodeScreen } from './screens/Code'
import { GenderScreen } from './screens/Gender'
import { AvatarScreen } from './screens/Avatar'
import { PushNotificationScreen } from './screens/PushNotification'

export const Stack = createStackNavigator()

/**
 *                              (JOIN MODE) Code -> Gender -> Avatar -> Notification
 * FirstName -> JoinOrCreate ->
 *                              (CREATE MODE) Gender -> Avatar -> Notification
 */
export const FormNavigator = () => (
  <FormContextProvider>
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={FirstNameScreen} name="FirstName" />
      <Stack.Screen component={JoinOrCreateScreen} name="JoinOrCreate" />
      <Stack.Screen component={CodeScreen} name="Code" />
      <Stack.Screen component={GenderScreen} name="Gender" />
      <Stack.Screen component={AvatarScreen} name="Avatar" />
      <Stack.Screen
        component={PushNotificationScreen}
        name="PushNotification"
      />
    </Stack.Navigator>
  </FormContextProvider>
)
