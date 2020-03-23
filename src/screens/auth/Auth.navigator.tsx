import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { getStackOptions } from '../../res/stackNavigation'
import { SelectScreen } from './Select'
import { SignUpScreen } from './SignUp'
import { JoinScreen } from './Join'
import { SignInScreen } from './SignIn'

const Stack = createStackNavigator()

export const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Select" headerMode="screen">
    <Stack.Screen
      name="Select"
      component={SelectScreen}
      options={getStackOptions({ headerShown: false })}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={getStackOptions({ headerTitle: "S'inscrire" })}
    />
    <Stack.Screen
      name="Join"
      component={JoinScreen}
      options={getStackOptions({ headerTitle: 'Rejoindre une relation' })}
    />
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={getStackOptions({ headerTitle: 'Se connecter' })}
    />
  </Stack.Navigator>
)
