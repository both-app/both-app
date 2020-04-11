import React, { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'

import { ChooseCategoryScreen } from './screens/ChooseCategory'
import { ChooseTaskScreen } from './screens/ChooseTask'

export const Stack = createStackNavigator()

export const AddTaskNavigator = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={ChooseCategoryScreen} name="ChooseCategory" />
      <Stack.Screen component={ChooseTaskScreen} name="ChooseTask" />
    </Stack.Navigator>
  )
}
