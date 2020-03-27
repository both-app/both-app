import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, useRoute } from '@react-navigation/native'

import { DashboardScreen } from './DashboardScreen'
import { NewTaskScreen } from './NewTask'

import { IconButton } from 'library/components/IconButton'
import { getStackOptions, getCurrentRouteName } from 'res/stackNavigation'

const Stack = createStackNavigator()

const ROUTES = {
  DASHBOARD: 'Dasboard',
  NEW_TASK: 'New Task',
}

export const DashboardNavigator = () => {
  const navigation = useNavigation()
  const route = useRoute()

  useLayoutEffect(() => {
    const routeName = getCurrentRouteName(route)

    if (routeName === ROUTES.NEW_TASK) {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  }, [navigation, route])

  return (
    <Stack.Navigator initialRouteName={ROUTES.DASHBOARD}>
      <Stack.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardScreen}
        options={getStackOptions({
          headerTitle: 'Dashboard',
          headerRight: () => (
            <IconButton
              iconName="add_circle"
              width={25}
              height={25}
              fill="white"
              onAction={() => navigation.navigate(ROUTES.NEW_TASK)}
            />
          ),
        })}
      />
      <Stack.Screen
        name={ROUTES.NEW_TASK}
        component={NewTaskScreen}
        options={getStackOptions({ headerTitle: 'Ajouter une tâche' })}
      />
    </Stack.Navigator>
  )
}
