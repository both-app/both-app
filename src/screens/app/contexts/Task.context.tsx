import React, { FC, createContext, useState, useMemo, useEffect } from 'react'

import { TASKS } from 'res/fixtures'

interface TaskContextProps {
  getTasksByCategoryId: (id: string) => Task[]
}

const TaskContext = createContext<TaskContextProps>({
  // @ts-ignore
  getTasksByCategoryId: () => {},
})

const TaskContextProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = () => {
      setTasks(TASKS)
    }

    fetchTasks()
  }, [])

  const getTasksByCategoryId = (categoryId: string) => {
    return tasks.filter((task) => task.categoryId === categoryId)
  }

  const taskContextApi = useMemo(
    () => ({
      getTasksByCategoryId,
    }),
    [tasks, getTasksByCategoryId]
  )

  return (
    <TaskContext.Provider value={taskContextApi}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskContextProvider }
