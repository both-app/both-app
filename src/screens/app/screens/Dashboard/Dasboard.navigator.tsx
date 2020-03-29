import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/core'

import { DashboardScreen } from './DashboardScreen'
import { AddTaskScreen } from './screens/AddTask'
import { getCurrentRouteName } from 'res/stackNavigation'

const Stack = createStackNavigator()

const ROUTES = {
  DASHBOARD: 'Dasboard',
  ADD_TASK: 'AddTask',
}

export const DashboardNavigator = () => {
  const navigation = useNavigation()
  const route = useRoute()

  useLayoutEffect(() => {
    const routeName = getCurrentRouteName(route)

    if (routeName === ROUTES.ADD_TASK) {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  }, [navigation, route])

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.DASHBOARD}
      headerMode="none"
      mode="modal"
    >
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={ROUTES.ADD_TASK} component={AddTaskScreen} />
    </Stack.Navigator>
  )
}
