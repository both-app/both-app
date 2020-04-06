import React, { FC, createContext, useState, useMemo, useEffect } from 'react'

import { api, APIResponse } from 'res/api'
import { setItem, getItem } from 'res/storage'
import { getNativeEmoji } from 'res/emoji'

interface TaskContextProps {
  getTasksByCategoryId: (id: string) => Task[]
  getTaskById: (id: string) => Task
  taskIdCompeted: string
  setTaskIdCompleted: (id: string) => void
}

type TasksResponse = APIResponse<{ tasks: Task[] }>

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
    const fetchTasks = async () => {
      const result = await api.get<TasksResponse>('/tasks')

      const tasks = result.data.data.tasks.map((task) => ({
        ...task,
        emoji: getNativeEmoji(task.emoji),
      }))

      setItem('tasks', tasks)
      setTasks(tasks)
    }

    const reHydrateData = async () => {
      const tasks = await getItem('tasks')
      setTasks(tasks)
      fetchTasks()
    }

    reHydrateData()
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
