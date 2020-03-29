import React, { FC, createContext, useState, useMemo, useEffect } from 'react'

const TASKS: Task[] = [
  {
    id: 'A',
    categoryId: '3', // Animaux
    icon: '🍗',
    name: 'Donner à manger',
    points: 1,
  },
  {
    id: 'B',
    categoryId: '3', // Animaux
    icon: '🐶',
    name: 'Promener le chien',
    points: 4,
  },
  {
    id: 'C',
    categoryId: '3', // Animaux
    icon: '😼',
    name: 'Netoyer la litière',
    points: 3,
  },
  {
    id: 'D',
    categoryId: '3', // Animaux
    icon: '🐾',
    name: 'Aller chez le véto',
    points: 2,
  },
]

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
