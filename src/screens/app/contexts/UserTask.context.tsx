import React, {
  FC,
  createContext,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from 'react'

import { api, APIResponse } from 'res/api'
import {
  userTaskReducer,
  userTaskInitialState,
  State,
} from './UserTask.reducer'
import { groupBy } from 'res/utils'

type GetUserTasksResponse = APIResponse<{ userTasks: UserTask[] }>
type PostUserTaskResponse = APIResponse<UserTask>

interface UserTaskContextProps extends State {
  fetchUserTasks: () => Promise<void>
  addNewUserTask: (taskId: string) => Promise<void>
  deleteUserTask: (userTaskId: string) => Promise<void>
  getUserTaskById: (userTaskId: string) => UserTask
  getUserTasksByUserId: (userId: string) => UserTask[]
  userTasksByDate: { [date: string]: UserTask[] }
}

// @ts-ignore
const UserTaskContext = createContext<UserTaskContextProps>({})

const UserTaskContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userTaskReducer, userTaskInitialState)

  useEffect(() => {
    fetchUserTasks()
  }, [])

  const fetchUserTasks = async () => {
    const result = await api.get<GetUserTasksResponse>('user_tasks')

    const userTasksSorted = result.data.data.userTasks.sort(
      // @ts-ignore
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    dispatch({ type: 'pushAllUserTasks', userTasks: userTasksSorted })
  }

  const addNewUserTask = async (taskId: string) => {
    const result = await api.post<PostUserTaskResponse>(`user_tasks/${taskId}`)

    dispatch({ type: 'pushUserTask', userTask: result.data.data })
  }

  const deleteUserTask = async (userTaskId: string) => {
    await api.delete('user_tasks', { data: { userTaskId } })

    dispatch({ type: 'deleteUserTask', userTaskId })
  }

  const getUserTaskById = useCallback(
    (userTaskId: string) => state.byId[userTaskId],
    [state.allIds]
  )

  const getUserTasksByUserId = useCallback(
    (userId: string) =>
      state.allIds
        .map(getUserTaskById)
        .filter((userTask) => userTask.userId === userId),
    [state.allIds]
  )

  const userTasksByDate = useMemo(() => {
    const userTasks = state.allIds.map(getUserTaskById)

    return groupBy(userTasks, ({ createdAt }: UserTask) =>
      new Date(createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    )
  }, [state.allIds])

  const userTaskContextApi = useMemo(
    () => ({
      ...state,
      fetchUserTasks,
      addNewUserTask,
      deleteUserTask,
      getUserTaskById,
      getUserTasksByUserId,
      userTasksByDate,
    }),
    [state.allIds]
  )

  return (
    <UserTaskContext.Provider value={userTaskContextApi}>
      {children}
    </UserTaskContext.Provider>
  )
}

export { UserTaskContext, UserTaskContextProvider }
