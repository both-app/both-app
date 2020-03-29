import React from 'react'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'

export const App = () => (
  <CategoryContextProvider>
    <TaskContextProvider>
      <AppNavigator />
    </TaskContextProvider>
  </CategoryContextProvider>
)
