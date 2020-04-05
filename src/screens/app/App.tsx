import React from 'react'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'

export const App = () => (
  <CategoryContextProvider>
    <TaskContextProvider>
      <ActionSheetProvider>
        <AppNavigator />
      </ActionSheetProvider>
    </TaskContextProvider>
  </CategoryContextProvider>
)
