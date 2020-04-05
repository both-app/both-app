import React from 'react'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationContextProvider } from './contexts/Relation.context'
import { UsersContextProvider } from './contexts/Users.context'

export const App = () => (
  <UsersContextProvider>
    <RelationContextProvider>
      <CategoryContextProvider>
        <TaskContextProvider>
          <AppNavigator />
        </TaskContextProvider>
      </CategoryContextProvider>
    </RelationContextProvider>
  </UsersContextProvider>
)
