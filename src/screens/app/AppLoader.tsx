import React, { useContext, useMemo, useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'

import { UserTaskContext } from './contexts/UserTask.context'
import { UsersContext } from './contexts/Users.context'
import { TaskContext } from './contexts/Task.context'
import { CategoryContext } from './contexts/Category.context'

export const AppLoader = ({ children }) => {
  const [ressourcesAreLoaded, setRessourcesAreLoaded] = useState<boolean>(false)
  const { allIds } = useContext(UserTaskContext)
  const { me } = useContext(UsersContext)
  const { tasks } = useContext(TaskContext)
  const { categories } = useContext(CategoryContext)

  const userTasksAreFetched = allIds.length > 0
  const usersAreReady = !!me.id
  const tasksAreFetched = tasks.length > 0
  const categoriesAreFetched = categories.length > 0

  useEffect(() => {
    cacheRessources()
  }, [])

  const cacheRessources = async () => {
    const images = [
      require('../../../assets/team/mathieu.png'),
      require('../../../assets/team/gauthier.png'),
      require('../../../assets/team/vincent.png'),
    ]

    await Promise.all(
      images.map((image) => Asset.fromModule(image).downloadAsync())
    )

    setRessourcesAreLoaded(true)
  }

  const dataIsFetched = useMemo(
    () =>
      userTasksAreFetched &&
      usersAreReady &&
      tasksAreFetched &&
      categoriesAreFetched,
    [userTasksAreFetched, usersAreReady, tasksAreFetched, categoriesAreFetched]
  )

  if (dataIsFetched && ressourcesAreLoaded) {
    return children
  }

  return <AppLoading />
}
