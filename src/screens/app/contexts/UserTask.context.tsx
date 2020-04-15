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
import { getYear, getWeek } from 'date-fns'

type GetUserTasksResponse = APIResponse<{ userTasks: UserTask[] }>
type PostUserTaskResponse = APIResponse<UserTask>

interface UserTaskContextProps extends State {
  fetchUserTasks: () => Promise<void>
  addNewUserTask: (taskId: string, difficulty: number) => Promise<void>
  deleteUserTask: (userTaskId: string) => Promise<void>
  getUserWeekTasksByUserId: (userId: string) => UserTask[]
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

  const getUserTasksByUserId = useCallback(
    (userId: string) =>
      state.userTasks.filter((userTask) => userTask.userId === userId),
    [state.userTasks]
  )

  const getUserWeekTasksByUserId = useCallback(
    (userId: string) => {
      const now = new Date()
      const year = getYear(now)
      const week = getWeek(now)
      return getUserTasksByUserId(userId).filter((userTask) => {
        const taskDate = new Date(userTask.createdAt)
        return getYear(taskDate) === year && getWeek(taskDate) === week
      })
    },
    [state.userTasks]
  )

  const userTasksByDate = useMemo(() => {
    return groupBy(
      Array.from(state.userTasks.values()),
      ({ createdAt }: UserTask) => createdAt.split('T')[0]
    )
  }, [state.userTasks])

  const userTaskContextApi = useMemo(
    () => ({
      ...state,
      fetchUserTasks,
      addNewUserTask,
      deleteUserTask,
      getUserWeekTasksByUserId,
      getUserTasksByUserId,
      userTasksByDate,
    }),
    [state.userTasks]
  )

  return (
    <UserTaskContext.Provider value={userTaskContextApi}>
      {children}
    </UserTaskContext.Provider>
  )
}

export { UserTaskContext, UserTaskContextProvider }
