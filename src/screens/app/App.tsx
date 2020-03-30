import React from 'react'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationTaskContextProvider } from './contexts/RelationTasks.context'

export const App = () => (
  <CategoryContextProvider>
    <TaskContextProvider>
      <RelationTaskContextProvider>
        <AppNavigator />
      </RelationTaskContextProvider>
    </TaskContextProvider>
  </CategoryContextProvider>
)
