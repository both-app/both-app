import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChooseCategoryScreen } from './screens/ChooseCategory'
import { ChooseTaskScreen } from './screens/ChooseTask'

export const Stack = createStackNavigator()

export const AddTaskNavigator = () => (
  <Stack.Navigator headerMode="none" screenOptions={{ gestureEnabled: false }}>
    <Stack.Screen component={ChooseCategoryScreen} name="ChooseCategory" />
    <Stack.Screen component={ChooseTaskScreen} name="ChooseTask" />
  </Stack.Navigator>
)
