import React, { useContext, useMemo } from 'react'

import { LoadingScreen } from 'screens/LoadingScreen'
import { UserTaskContext } from './contexts/UserTask.context'
import { UsersContext } from './contexts/Users.context'
import { TaskContext } from './contexts/Task.context'
import { CategoryContext } from './contexts/Category.context'
import { RelationContext } from './contexts/Relation.context'
import { AuthContext } from 'screens/auth/contexts'

export const AppLoader = ({ children }) => {
  const { allIds } = useContext(UserTaskContext)
  const { me, hasError } = useContext(UsersContext)
  const { tasks } = useContext(TaskContext)
  const { categories } = useContext(CategoryContext)
  const { relation } = useContext(RelationContext)
  const { logout } = useContext(AuthContext)

  const userTasksAreFetched = allIds.length > 0
  const usersAreReady = !!me.id
  const tasksAreFetched = tasks.length > 0
  const categoriesAreFetched = categories.length > 0
  const relationAreFetched = !!relation.id

  const dataIsFetched = useMemo(
    () =>
      userTasksAreFetched &&
      usersAreReady &&
      tasksAreFetched &&
      categoriesAreFetched &&
      relationAreFetched,
    [
      userTasksAreFetched,
      usersAreReady,
      tasksAreFetched,
      categoriesAreFetched,
      relationAreFetched,
    ]
  )

  if (hasError) {
    logout(false)
  }

  if (dataIsFetched && !hasError) {
    return children
  }

  return <LoadingScreen />
}
