import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'

import { DashboardScreen } from './DashboardScreen'
import { AddTaskNavigator } from 'screens/app/screens/AddTask'
import { ProfilNavigator } from '../Profil'
import { getCurrentRouteName } from 'res/stackNavigation'

const Stack = createStackNavigator()

const ROUTES = {
  DASHBOARD: 'Dashboard',
  ADD_TASK: 'AddTask',
  PROFIL: 'Profil',
}

export const DashboardNavigator = () => {
  const navigation = useNavigation()
  const route = useRoute()

  // TODO: Update the code when the TabBar will be visible
  useLayoutEffect(() => {
    const routeName = getCurrentRouteName(route)

    if (routeName) {
      navigation.setOptions({ tabBarVisible: false })
    }
  }, [navigation, route])

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.DASHBOARD}
      headerMode="none"
      mode="modal"
    >
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={ROUTES.ADD_TASK} component={AddTaskNavigator} />
      <Stack.Screen name={ROUTES.PROFIL} component={ProfilNavigator} />
    </Stack.Navigator>
  )
}
