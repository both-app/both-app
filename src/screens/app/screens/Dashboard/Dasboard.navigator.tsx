import React, { useLayoutEffect } from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'

import { DashboardScreen } from './DashboardScreen'
import { AddTaskNavigator } from 'screens/app/screens/AddTask'
import { getCurrentRouteName } from 'res/stackNavigation'
import { TaskAddedModalContextProvider } from './components/TaskAddedModal'

const Stack = createStackNavigator()

const ROUTES = {
  DASHBOARD: 'Dashboard',
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
    <TaskAddedModalContextProvider>
      <Stack.Navigator initialRouteName={ROUTES.DASHBOARD} headerMode="none">
        <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
        <Stack.Screen
          name={ROUTES.ADD_TASK}
          component={AddTaskNavigator}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
      </Stack.Navigator>
    </TaskAddedModalContextProvider>
  )
}
