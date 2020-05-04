import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChooseCategoryScreen } from './screens/ChooseCategory'
import { ChooseTaskScreen } from './screens/ChooseTask'
import { ChooseTaskDifficultyScreen } from './screens/ChooseTaskDifficulty'
import { AddTaskContextProvider } from './AddTask.context'

export const ROUTES = {
  CHOOSE_CATEGORY: 'ChooseCategory',
  CHOOSE_TASK: 'ChooseTask',
  CHOOSE_TASK_DIFFICULTY: 'ChooseTaskDifficulty',
}

export const initialRoute = ROUTES.CHOOSE_CATEGORY

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
  <AddTaskContextProvider>
    <AddTaskStack.Navigator headerMode="none" initialRouteName={initialRoute}>
      <AddTaskStack.Screen
        component={ChooseCategoryScreen}
        name={ROUTES.CHOOSE_CATEGORY}
      />
      <AddTaskStack.Screen
        component={ChooseTaskScreen}
        name={ROUTES.CHOOSE_TASK}
      />
      <AddTaskStack.Screen
        component={ChooseTaskDifficultyScreen}
        name={ROUTES.CHOOSE_TASK_DIFFICULTY}
      />
    </AddTaskStack.Navigator>
  </AddTaskContextProvider>
)
