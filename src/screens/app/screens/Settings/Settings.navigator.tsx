import React, { useLayoutEffect, useCallback } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native'
import { StatusBar } from 'react-native'

import { getCurrentRouteName } from 'res/stackNavigation'

import { SettingsScreen } from './SettingsScreen'
import { TheTeamScreen } from './screens/TheTeam'

export const Stack = createStackNavigator()

const ROUTES = {
  SETTINGS: 'Settings',
  THE_TEAM: 'TheTeam',
}

export const SettingsNavigator = () => {
  const navigation = useNavigation()
  const route = useRoute()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  useLayoutEffect(() => {
    const routeName = getCurrentRouteName(route)

    if (routeName === ROUTES.SETTINGS || !routeName) {
      navigation.setOptions({ tabBarVisible: true })
    } else {
      navigation.setOptions({ tabBarVisible: false })
    }
  }, [navigation, route])

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={SettingsScreen} name={ROUTES.SETTINGS} />
      <Stack.Screen component={TheTeamScreen} name={ROUTES.THE_TEAM} />
    </Stack.Navigator>
  )
}
