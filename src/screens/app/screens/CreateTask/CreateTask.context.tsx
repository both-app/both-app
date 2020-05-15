import React, { FC, createContext, useMemo } from 'react'
import * as Analytics from 'expo-firebase-analytics'

import { api, APIResponse } from 'res/api'

type CreateCustomTaskResponse = APIResponse<{ data: { customTask: Task } }>

interface CreateTaskContextProps {
  createTask: (params: {
    emoji: string
    points: number
    name: string
  }) => Promise<void>
}

// @ts-ignore
const CreateTaskContext = createContext<CreateTaskContextProps>({})

const CreateTaskContextProvider: FC = ({ children }) => {
  const createTask: CreateTaskContextProps['createTask'] = async (params) => {
    const result = await api.post<CreateCustomTaskResponse>('tasks/custom', {
      emoji: params.emoji,
      name: params.name,
      // TODO Create a enum with the categoryIds @mathieuletyrant
      categoryId: 'custom_tasks',
      difficulties: [
        {
          emoji: '',
          name: '',
          points: params.points,
        },
      ],
    })

    console.log(result)

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
