import React from 'react'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationContextProvider } from './contexts/Relation.context'

export const App = () => (
  <RelationContextProvider>
    <CategoryContextProvider>
      <TaskContextProvider>
        <AppNavigator />
      </TaskContextProvider>
    </CategoryContextProvider>
  </RelationContextProvider>
)
