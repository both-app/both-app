import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SelectScreen } from './Select'
import { CreateScreen } from './Create'
import { JoinScreen } from './Join'

import { getStackOptions } from '../../res/stackNavigation'

const Stack = createStackNavigator()

const ROUTES = {
  SELECT: 'Select',
  CREATE: 'Create',
  JOIN: 'Join',
}

export const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.SELECT} headerMode="screen">
    <Stack.Screen
      name={ROUTES.SELECT}
      component={SelectScreen}
      options={getStackOptions({ headerShown: false })}
    />
    <Stack.Screen
      name={ROUTES.CREATE}
      component={CreateScreen}
      options={getStackOptions({ headerTitle: 'Créer une relation' })}
    />
    <Stack.Screen
      name={ROUTES.JOIN}
      component={JoinScreen}
      options={getStackOptions({ headerTitle: 'Rejoindre une relation' })}
    />
  </Stack.Navigator>
)
