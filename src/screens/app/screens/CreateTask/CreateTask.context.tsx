import React, { FC, createContext, useMemo, useContext } from 'react'
import * as Analytics from 'expo-firebase-analytics'

import { api, APIResponse } from 'res/api'

import { TaskContext } from 'screens/app/contexts/Task.context'

type CreateCustomTaskResponse = APIResponse<{ customTask: Task }>

interface CreateTaskContextProps {
  createTask: (params: {
    categoryId: string
    emoji: string
    points: number
    name: string
  }) => Promise<void>
}

// @ts-ignore
const CreateTaskContext = createContext<CreateTaskContextProps>({})

const CreateTaskContextProvider: FC = ({ children }) => {
  const { addTask } = useContext(TaskContext)

  const createTask: CreateTaskContextProps['createTask'] = async (params) => {
    const result = await api.post<CreateCustomTaskResponse>('tasks/custom', {
      emoji: params.emoji,
      name: params.name,
      categoryId: params.categoryId,
      difficulties: [
        {
          emoji: '',
          name: '',
          points: params.points,
        },
      ],
    })

    addTask(result.data.data.customTask)

    Analytics.logEvent('CreateTask')
  }

  const createTaskContextApi = useMemo(() => ({ createTask }), [createTask])

  return (
    <CreateTaskContext.Provider value={createTaskContextApi}>
      {children}
    </CreateTaskContext.Provider>
  )
}

export { CreateTaskContext, CreateTaskContextProvider }
