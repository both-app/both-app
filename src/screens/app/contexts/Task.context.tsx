import React, { FC, createContext, useState, useMemo, useEffect } from 'react'

import { TASKS } from 'res/fixtures'

interface TaskContextProps {
  getTasksByCategoryId: (id: string) => Task[]
  getTaskById: (id: string) => Task
  taskIdCompeted: string
  setTaskIdCompleted: (id: string) => void
}

const TaskContext = createContext<TaskContextProps>({
  // @ts-ignore
  getTasksByCategoryId: () => [],
  // @ts-ignore
  getTaskById: () => {},
  taskIdCompeted: '',
  // @ts-ignore
  setTaskIdCompleted: () => {},
})

const TaskContextProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskIdCompleted, setTaskIdCompleted] = useState<string>()

  useEffect(() => {
    const fetchTasks = () => {
      setTasks(TASKS)
    }

    fetchTasks()
  }, [])

  const getTasksByCategoryId = (categoryId: string) => {
    return tasks.filter((task) => task.categoryId === categoryId)
  }

  const getTaskById = (taskId: string) => {
    return tasks.find((task) => task.id === taskId)
  }

  const taskContextApi = useMemo(
    () => ({
      getTasksByCategoryId,
      getTaskById,
      taskIdCompleted,
      setTaskIdCompleted,
    }),
    [
      tasks,
      getTasksByCategoryId,
      getTaskById,
      taskIdCompleted,
      setTaskIdCompleted,
    ]
  )

  return (
    <TaskContext.Provider value={taskContextApi}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskContextProvider }
