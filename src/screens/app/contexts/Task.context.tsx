import React, {
  FC,
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'

import { api, APIResponse } from 'res/api'
import { setItem, getItem } from 'res/storage'

interface TaskContextProps {
  tasks: Task[]
  getTasksByCategoryId: (id: string) => Task[]
  getTaskById: (id: string) => Task
  getPoints: (id: string) => string
}

type TasksResponse = APIResponse<{ tasks: Task[] }>

// @ts-ignore
const TaskContext = createContext<TaskContextProps>({})

const TaskContextProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const {
        data: {
          data: { tasks },
        },
      } = await api.get<TasksResponse>('/tasks')

      setItem('tasks', tasks)
      setTasks(tasks)
    }

    const reHydrateData = async () => {
      const tasks = await getItem('tasks')
      if (tasks) {
        setTasks(tasks)
      }

      fetchTasks()
    }

    reHydrateData()
  }, [])

  const getTasksByCategoryId = useCallback(
    (categoryId: string) =>
      tasks
        .filter((task) => task.categoryId === categoryId)
        .filter((task) => !task.serverOnly),
    [tasks]
  )

  const getTaskById = useCallback(
    (taskId: string) => tasks.find((task) => task.id === taskId),
    [tasks]
  )

  const getPoints = useCallback(
    (taskId: string) => {
      const task = tasks.find((task) => task.id === taskId)
      const difficultiesSorted = task.difficulties.sort(
        (a, b) => a.points - b.points
      )

      if (difficultiesSorted.length > 1) {
        return `${difficultiesSorted[0].points}-${
          difficultiesSorted[difficultiesSorted.length - 1].points
        }`
      }

      return difficultiesSorted[0].points
    },
    [tasks]
  )

  const taskContextApi = useMemo(
    () => ({
      tasks,
      getTasksByCategoryId,
      getTaskById,
      getPoints,
    }),
    [tasks, getTasksByCategoryId, getTaskById, getPoints]
  )

  return (
    <TaskContext.Provider value={taskContextApi}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskContextProvider }
