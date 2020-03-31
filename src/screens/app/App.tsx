import React from 'react'

// import { AppNavigator } from './App.navigator'
import { DashboardNavigator } from './screens/Dashboard'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationTaskContextProvider } from './contexts/RelationTasks.context'

export const App = () => (
  <CategoryContextProvider>
    <TaskContextProvider>
      <RelationTaskContextProvider>
        <DashboardNavigator />
      </RelationTaskContextProvider>
    </TaskContextProvider>
  </CategoryContextProvider>
)
