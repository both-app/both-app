import React, {
  createContext,
  FC,
  useEffect,
  useMemo,
  useContext,
  useState,
} from 'react'

import { useAppState } from 'hooks/useAppState'

import { getItem, setItem } from 'res/storage'
import { APIResponse, api } from 'res/api'

import { UsersContext } from './Users.context'
import { AppNavigatorContext } from './AppNavigator.context'

interface TasksRequestState {
  partnerRequests: TaskRequest[]
  myRequests: TaskRequest[]
}

interface TaskRequestContextProps extends TasksRequestState {
  fetchTasksRequest: Function
  archiveTaskRequest: (id: string) => void
  addRequestTask: Function
}

type TasksRequestResponse = APIResponse<{
  requested: TaskRequest<'requested'>[]
}>
type AddTaskRequestResponse = APIResponse<{ data: TaskRequest<'requested'> }>

// @ts-ignore
const TaskRequestContext = createContext<TaskRequestContextProps>({})

const TaskRequestContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const { me, partner } = useContext(UsersContext)
  const { setRouteBadge, unSetRouteBadge } = useContext(AppNavigatorContext)
  const [state, setState] = useState<TasksRequestState>({
    partnerRequests: [],
    myRequests: [],
  })

  useEffect(() => {
    const reHydrateData = async () => {
      const tasksRequest = await getItem('tasksRequest')
      if (tasksRequest) {
        setState(tasksRequest)
      }

      fetchTasksRequest()
    }

    reHydrateData()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchTasksRequest()
    }
  }, [appState])

  const groupTasksRequest = (tasks: TaskRequest[]) => {
    return tasks.reduce<TasksRequestState>(
      (acc, task) => {
        if (task.userId === me.id) {
          acc['partnerRequests'].push(task)
        } else {
          acc['myRequests'].push(task)
        }

        return acc
      },
      { partnerRequests: [], myRequests: [] }
    )
  }

  const addRequestTask = async (taskId: string) => {
    const userId = partner.id
    await api.post<AddTaskRequestResponse>('task_requests', {
      userId,
      taskId,
    })

    fetchTasksRequest()
  }

  const fetchTasksRequest = async () => {
    const { data } = await api.get<TasksRequestResponse>('task_requests')

    const tasksGroupedByUser = groupTasksRequest(data.data.requested)

    // It means that my partner ask me to do some tasks
    if (tasksGroupedByUser.partnerRequests.length > 0) {
      setRouteBadge('Relation')
    } else {
      unSetRouteBadge('Relation')
    }

    setItem('tasksRequest', tasksGroupedByUser)
    setState(tasksGroupedByUser)
  }

  const archiveTaskRequest = async (id: string) => {}

  const taskRequestContextApi = useMemo(
    () => ({ ...state, fetchTasksRequest, archiveTaskRequest, addRequestTask }),
    [state, fetchTasksRequest, archiveTaskRequest, addRequestTask]
  )

  return (
    <TaskRequestContext.Provider value={taskRequestContextApi}>
      {children}
    </TaskRequestContext.Provider>
  )
}

export { TaskRequestContext, TaskRequestContextProvider }
