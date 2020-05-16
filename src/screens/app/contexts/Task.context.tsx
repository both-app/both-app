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

import { useAppState } from 'hooks/useAppState'

interface TaskContextProps {
  tasks: Task[]
  getTasksByCategoryId: (id: string) => Task[]
  getTaskById: (id: string) => Task
  getPoints: (id: string) => string
  fetchTasks: () => Promise<void>
  addTask: (task: Task) => void
  getPointsFromDifficulties: (difficulties: TaskDifficulty[]) => number
}

type TasksResponse = APIResponse<{ tasks: Task[] }>

// @ts-ignore
const TaskContext = createContext<TaskContextProps>({})

const TaskContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const reHydrateData = async () => {
      const tasks = await getItem('tasks')
      if (tasks) {
        setTasks(tasks)
      }

      fetchTasks()
    }

    reHydrateData()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchTasks()
    }
  }, [appState])

  const fetchTasks = async () => {
    const {
      data: {
        data: { tasks },
      },
    } = await api.get<TasksResponse>('/tasks')

    setItem('tasks', tasks)
    setTasks(tasks)
  }

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

  const getPointsFromDifficulties = (difficulties: TaskDifficulty[]) => {
    const difficultiesSorted = difficulties.sort((a, b) => a.points - b.points)

    if (difficultiesSorted.length > 1) {
      return `${difficultiesSorted[0].points}-${
        difficultiesSorted[difficultiesSorted.length - 1].points
      }`
    }

    if (difficultiesSorted.length === 1) {
      return difficultiesSorted[0].points
    }

    return '?'
  }

  const getPoints = useCallback(
    (taskId: string) => {
      const task = tasks.find((task) => task.id === taskId)

      return getPointsFromDifficulties(task.difficulties)
    },
    [tasks]
  )

  const addTask = (task: Task) => {
    const newTasks = [task, ...tasks]

    setItem('tasks', newTasks)
    setTasks(newTasks)
  }

  const taskContextApi = useMemo(
    () => ({
      tasks,
      getTasksByCategoryId,
      getTaskById,
      getPoints,
      fetchTasks,
      addTask,
      getPointsFromDifficulties,
    }),
    [
      tasks,
      getTasksByCategoryId,
      getTaskById,
      getPoints,
      fetchTasks,
      addTask,
      getPointsFromDifficulties,
    ]
  )

  return (
    <TaskContext.Provider value={taskContextApi}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskContextProvider }
