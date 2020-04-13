import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChooseCategoryScreen } from './screens/ChooseCategory'
import { ChooseTaskScreen } from './screens/ChooseTask'
import { ChooseTaskDifficultyScreen } from './screens/ChooseTaskDifficulty'

export type AddTaskStackParamList = {
  ChooseCategory: undefined
  ChooseTask: { category: Category }
  ChooseTaskDifficulty: {
    category: Category
    task: Task
  }
}

export const AddTaskStack = createStackNavigator()

export const AddTaskNavigator = () => (
  <AddTaskStack.Navigator headerMode="none">
    <AddTaskStack.Screen
      component={ChooseCategoryScreen}
      name="ChooseCategory"
    />
    <AddTaskStack.Screen component={ChooseTaskScreen} name="ChooseTask" />
    <AddTaskStack.Screen
      component={ChooseTaskDifficultyScreen}
      name="ChooseTaskDifficulty"
    />
  </AddTaskStack.Navigator>
)
