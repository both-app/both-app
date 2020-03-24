import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { getStackOptions } from '../../res/stackNavigation'
import { SelectScreen } from './Select'
import { SignUpScreen } from './SignUp'
import { JoinScreen } from './Join'
import { SignInScreen } from './SignIn'

const Stack = createStackNavigator()

const ROUTES = {
  SELECT: 'Select',
  SIGN_UP: 'SignUp',
  JOIN: 'Join',
  SIGN_IN: 'SignIn',
}

export const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.SELECT} headerMode="screen">
    <Stack.Screen
      name={ROUTES.SELECT}
      component={SelectScreen}
      options={getStackOptions({ headerShown: false })}
    />
    <Stack.Screen
      name={ROUTES.SIGN_UP}
      component={SignUpScreen}
      options={getStackOptions({ headerTitle: "S'inscrire" })}
    />
    <Stack.Screen
      name={ROUTES.JOIN}
      component={JoinScreen}
      options={getStackOptions({ headerTitle: 'Rejoindre une relation' })}
    />
    <Stack.Screen
      name={ROUTES.SIGN_IN}
      component={SignInScreen}
      options={getStackOptions({ headerTitle: 'Se connecter' })}
    />
  </Stack.Navigator>
)
