import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { SelectScreen } from './SelectScreen'
import { SignUpScreen } from './SignUp'
import { JoinRelationScreen } from './JoinRelation'
import { SignInScreen } from './SignIn'
import { colors } from '../../res/colors'

const Stack = createStackNavigator()

export const SelectScreenNavigator = () => (
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
      name="JoinRelation"
      component={JoinRelationScreen}
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
