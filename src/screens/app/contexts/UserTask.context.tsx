import React, {
  FC,
  createContext,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from 'react'

import { api, APIResponse } from 'res/api'
import { groupBy } from 'res/utils'

import { useAppState } from 'hooks/useAppState'

import {
  userTaskReducer,
  userTaskInitialState,
  State,
} from './UserTask.reducer'

type GetUserTasksResponse = APIResponse<{ userTasks: UserTask[] }>
type GetUserScoreResponse = APIResponse<UserScore>
type PostUserTaskResponse = APIResponse<UserTask>

interface UserTaskContextProps extends State {
  fetchUserTasks: () => Promise<void>
  fetchUserScore: () => Promise<void>
  addNewUserTask: (taskId: string, difficulty: number) => Promise<void>
  deleteUserTask: (userTaskId: string) => Promise<void>
  getUserTaskById: (userTaskId: string) => UserTask
  getUserTasksByUserId: (userId: string) => UserTask[]
  userTasksByDate: { [date: string]: UserTask[] }
}

// @ts-ignore
const UserTaskContext = createContext<UserTaskContextProps>({})

const UserTaskContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const [state, dispatch] = useReducer(userTaskReducer, userTaskInitialState)

  useEffect(() => {
    fetchUserTasks(), fetchUserScore()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchUserTasks(), fetchUserScore()
    }
  }, [appState])

  const fetchUserTasks = async () => {
    const result = await api.get<GetUserTasksResponse>('user_tasks')

    const userTasksSorted = result.data.data.userTasks.sort(
      // @ts-ignore
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    dispatch({ type: 'pushAllUserTasks', userTasks: userTasksSorted })
  }

  const fetchUserScore = async () => {
    const result = await api.get<GetUserScoreResponse>('user_tasks/recap')
    dispatch({ type: 'pushUserScore', userScore: result.data.data })
  }

  const addNewUserTask: UserTaskContextProps['addNewUserTask'] = async (
    taskId: string,
    difficulty: number
  ) => {
    const result = await api.post<PostUserTaskResponse>(
      `user_tasks/${taskId}`,
      { difficulty }
    )

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

    return groupBy(
      userTasks,
      ({ createdAt }: UserTask) => createdAt.split('T')[0]
    )
  }, [state.allIds])

  const userTaskContextApi = useMemo(
    () => ({
      ...state,
      fetchUserTasks,
      fetchUserScore,
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
