import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '../../res/colors'
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
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{
        headerTitle: "S'inscrire",
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitle,
        headerBackTitleVisible: false,
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Join"
      component={JoinScreen}
      options={{
        headerTitle: 'Rejoindre une relation',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitle,
        headerBackTitleVisible: false,
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        headerTitle: 'Se connecter',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitle,
        headerBackTitleVisible: false,
        headerTintColor: 'white',
      }}
    />
  </Stack.Navigator>
)

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.pink,
  },
  headerTitle: {
    color: 'white',
  },
})
