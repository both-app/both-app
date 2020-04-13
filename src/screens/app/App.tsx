import React from 'react'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationContextProvider } from './contexts/Relation.context'
import { UsersContextProvider } from './contexts/Users.context'
import { UserTaskContextProvider } from './contexts/UserTask.context'
import { AppLoader } from './AppLoader'

export const App = () => (
  <UsersContextProvider>
    <CategoryContextProvider>
      <TaskContextProvider>
        <RelationContextProvider>
          <UserTaskContextProvider>
            <AppLoader>
              <AppNavigator />
            </AppLoader>
          </UserTaskContextProvider>
        </RelationContextProvider>
      </TaskContextProvider>
    </CategoryContextProvider>
  </UsersContextProvider>
)
