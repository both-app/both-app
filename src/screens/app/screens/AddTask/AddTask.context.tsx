import React, { FC, createContext, useMemo, useContext } from 'react'
import * as Analytics from 'expo-firebase-analytics'

import { TaskAddedModalContext } from '../Home/components/TaskAddedModal'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

interface AddTaskContextProps {
  addTask: (task: Task, difficultyIndex: number) => Promise<void>
}

// @ts-ignore
const AddTaskContext = createContext<AddTaskContextProps>({})

const AddTaskContextProvider: FC = ({ children }) => {
  const { openTaskAddedModal } = useContext(TaskAddedModalContext)
  const { incrementUserPoints, fetchUserScore } = useContext(UserScoreContext)
  const { addNewUserTask } = useContext(UserTaskContext)

  const addTask: AddTaskContextProps['addTask'] = async (
    task: Task,
    difficultyIndex: number
  ) => {
    const { points } = task.difficulties[difficultyIndex]

    openTaskAddedModal(task.emoji, points)
    incrementUserPoints(points)

    await addNewUserTask(task.id, difficultyIndex)
    Analytics.logEvent('AddNewUserTask', {
      taskId: task.id,
      taskName: task.name,
      taskDifficulty: difficultyIndex,
    })
    await fetchUserScore()
  }

  const addTaskContextApi = useMemo(() => ({ addTask }), [addTask])

  return (
    <AddTaskContext.Provider value={addTaskContextApi}>
      {children}
    </AddTaskContext.Provider>
  )
}

export { AddTaskContext, AddTaskContextProvider }
