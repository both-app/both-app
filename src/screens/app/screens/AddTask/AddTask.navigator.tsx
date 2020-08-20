import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChooseCategoryScreen } from './screens/ChooseCategory'
import { ChooseTaskScreen } from './screens/ChooseTask'
import { ChooseTaskDifficultyScreen } from './screens/ChooseTaskDifficulty'
import { AddTaskContextProvider } from './AddTask.context'
import { CreateTaskNavigator } from '../CreateTask'
import { AddRelationTaskNavigator } from '../AddRelationTask'

export const ROUTES = {
  CHOOSE_CATEGORY: 'ChooseCategory',
  CHOOSE_TASK: 'ChooseTask',
  CHOOSE_TASK_DIFFICULTY: 'ChooseTaskDifficulty',
  CREATE_TASK: 'CreateTask',
  ADD_RELATION_TASK: 'AddRelationTask',
}

export const initialRoute = ROUTES.CHOOSE_CATEGORY

export type AddTaskStackParamList = {
  ChooseCategory: {
    addRelationTask: boolean
  }
  ChooseTask: {
    category: Category
    newTaskId?: string
    addRelationTask: boolean
  }
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
      <AddTaskStack.Screen
        component={CreateTaskNavigator}
        name={ROUTES.CREATE_TASK}
      />
      <AddTaskStack.Screen
        component={AddRelationTaskNavigator}
        name={ROUTES.ADD_RELATION_TASK}
      />
    </AddTaskStack.Navigator>
  </AddTaskContextProvider>
)
