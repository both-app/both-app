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
import { getNativeEmoji } from 'res/emoji'

interface TaskContextProps {
  tasks: Task[]
  getTasksByCategoryId: (id: string) => Task[]
  getTaskById: (id: string) => Task
  taskIdCompeted: string
  setTaskIdCompleted: (id: string) => void
  getPoints: (id: string, difficulty?: number) => string
}

type TasksResponse = APIResponse<{ tasks: Task[] }>

// @ts-ignore
const TaskContext = createContext<TaskContextProps>({})

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
    (taskId: string, difficulty?: number) => {
      const task = tasks.find((task) => task.id === taskId)
      const difficultiesSorted = task.difficulties.sort(
        (a, b) => a.points - b.points
      )

      if (difficulty) {
        return task.difficulties[difficulty].points
      }

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
      taskIdCompleted,
      setTaskIdCompleted,
    }),
    [
      tasks,
      getTasksByCategoryId,
      getTaskById,
      getPoints,
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
