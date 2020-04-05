import React from 'react'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationTaskContextProvider } from './contexts/RelationTasks.context'

export const App = () => (
  <CategoryContextProvider>
    <TaskContextProvider>
      <RelationTaskContextProvider>
        <ActionSheetProvider>
          <AppNavigator />
        </ActionSheetProvider>
      </RelationTaskContextProvider>
    </TaskContextProvider>
  </CategoryContextProvider>
)
