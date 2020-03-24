import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { DashboardScreen } from './DashboardScreen'
import { NewTaskScreen } from './NewTask'
import { getStackOptions } from '../../../res/stackNavigation'
import { IconButton } from '../../../library/components/IconButton'

const Stack = createStackNavigator()

export const DashboardNavigator = () => {
  const navigation = useNavigation()

  const goTo = (screenName: string) => () => navigation.navigate(screenName)

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={getStackOptions({
          headerTitle: 'Dashboard',
          headerRight: () => (
            <IconButton
              iconName="add_circle"
              width={25}
              height={25}
              fill="white"
              onAction={goTo('New Task')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="New Task"
        component={NewTaskScreen}
        options={getStackOptions({ headerTitle: 'Ajouter une tâche' })}
      />
    </Stack.Navigator>
  )
}
