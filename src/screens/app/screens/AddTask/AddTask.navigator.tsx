import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChooseCategoryScreen } from './screens/ChooseCategory'
import { ChooseTaskScreen } from './screens/ChooseTask'
import { ChooseTaskDifficultyScreen } from './screens/ChooseTaskDifficulty'

export const Stack = createStackNavigator()

export const AddTaskNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen component={ChooseCategoryScreen} name="ChooseCategory" />
    <Stack.Screen component={ChooseTaskScreen} name="ChooseTask" />
    <Stack.Screen
      component={ChooseTaskDifficultyScreen}
      name="ChooseTaskDifficulty"
    />
  </Stack.Navigator>
)
