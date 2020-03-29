import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { NameScreen } from './screens/Name'
import { PartnerNameScreen } from './screens/PartnerName'
import { GenderScreen } from './screens/Gender'

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
      <Stack.Screen component={PartnerNameScreen} name="PartnerName" />
    </Stack.Navigator>
  </CreateContextProvider>
)
