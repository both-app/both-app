import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { CodeScreen } from './screens/Code'
import { GenderScreen } from './screens/Gender'

import { JoinContextProvider } from './Join.context'

export const Stack = createStackNavigator()

export const JoinNavigator = () => (
  <JoinContextProvider>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen component={CodeScreen} name="Code" />
      <Stack.Screen component={GenderScreen} name="Gender" />
    </Stack.Navigator>
  </JoinContextProvider>
)
