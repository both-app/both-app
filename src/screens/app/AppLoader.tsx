import React, { useContext, useMemo } from 'react'

import { LoadingScreen } from 'screens/LoadingScreen'
import { UserTaskContext } from './contexts/UserTask.context'
import { UsersContext } from './contexts/Users.context'
import { TaskContext } from './contexts/Task.context'
import { CategoryContext } from './contexts/Category.context'
import { RelationContext } from './contexts/Relation.context'

export const AppLoader = ({ children }) => {
  const { userTasks } = useContext(UserTaskContext)
  const { me } = useContext(UsersContext)
  const { tasks } = useContext(TaskContext)
  const { categories } = useContext(CategoryContext)
  const { relation } = useContext(RelationContext)

  const userTasksAreFetched = userTasks.size > 0
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

  if (dataIsFetched) {
    return children
  }

  return <LoadingScreen />
}
