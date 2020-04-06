import React from 'react'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationContextProvider } from './contexts/Relation.context'
import { UsersContextProvider } from './contexts/Users.context'
import { UserTaskContextProvider } from './contexts/UserTask.context'

export const App = () => (
  <UsersContextProvider>
    <UserTaskContextProvider>
      <RelationContextProvider>
        <CategoryContextProvider>
          <TaskContextProvider>
            <AppNavigator />
          </TaskContextProvider>
        </CategoryContextProvider>
      </RelationContextProvider>
    </UserTaskContextProvider>
  </UsersContextProvider>
)
