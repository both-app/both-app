import React, { useLayoutEffect, useCallback } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native'

import { getCurrentRouteName } from 'res/stackNavigation'

import { ProfilScreen } from './ProfilScreen'
import { SettingsScreen } from './screens/Settings'
import { TheTeamScreen } from './screens/TheTeam'
import { StatusBar } from 'react-native'

export const Stack = createStackNavigator()

const ROUTES = {
  PROFIL: 'Profil',
  SETTINGS: 'Settings',
  THE_TEAM: 'TheTeam',
}

export const ProfilNavigator = () => {
  const navigation = useNavigation()
  const route = useRoute()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  useLayoutEffect(() => {
    const routeName = getCurrentRouteName(route)

    if (routeName === ROUTES.PROFIL || !routeName) {
      navigation.setOptions({ tabBarVisible: true })
    } else {
      navigation.setOptions({ tabBarVisible: false })
    }
  }, [navigation, route])

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={ProfilScreen} name={ROUTES.PROFIL} />
      <Stack.Screen component={SettingsScreen} name={ROUTES.SETTINGS} />
      <Stack.Screen component={TheTeamScreen} name={ROUTES.THE_TEAM} />
    </Stack.Navigator>
  )
}
