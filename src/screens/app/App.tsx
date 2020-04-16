import React from 'react'

import { AppNavigator } from './App.navigator'
import { CategoryContextProvider } from './contexts/Category.context'
import { TaskContextProvider } from './contexts/Task.context'
import { RelationContextProvider } from './contexts/Relation.context'
import { UsersContextProvider } from './contexts/Users.context'
import { UserTaskContextProvider } from './contexts/UserTask.context'
import { UserScoreContextProvider } from './contexts/UserScore.context'
import { AppLoader } from './AppLoader'

export const App = () => (
  <UsersContextProvider>
    <CategoryContextProvider>
      <TaskContextProvider>
        <RelationContextProvider>
          <UserTaskContextProvider>
            <UserScoreContextProvider>
              <AppLoader>
                <AppNavigator />
              </AppLoader>
            </UserScoreContextProvider>
          </UserTaskContextProvider>
        </RelationContextProvider>
      </TaskContextProvider>
    </CategoryContextProvider>
  </UsersContextProvider>
)
