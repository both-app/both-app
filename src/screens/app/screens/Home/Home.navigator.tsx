import React, { useLayoutEffect } from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'

import { HomeScreen } from './HomeScreen'
import { AddTaskNavigator } from 'screens/app/screens/AddTask'
import { getCurrentRouteName } from 'res/stackNavigation'
import { TaskAddedModalContextProvider } from './components/TaskAddedModal'

const Stack = createStackNavigator()

const ROUTES = {
  HOME: 'Home',
  ADD_TASK: 'AddTask',
}

export const HomeNavigator = () => {
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
      <Stack.Navigator initialRouteName={ROUTES.HOME} headerMode="none">
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
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
