import React, { FC, createContext, useMemo, useState } from 'react'

interface TaskAdded {
  emoji: string
  points: number
}

interface TaskAddedContextProps {
  openTaskAddedModal: (task: Task, taskDifficultyIndex: number) => void
  closeTaskAddedModal: () => void
  taskAdded: TaskAdded
}

// @ts-ignore
const TaskAddedModalContext = createContext<TaskAddedContextProps>({})

const TaskAddedModalContextProvider: FC = ({ children }) => {
  const [taskAdded, setTaskAdded] = useState<TaskAdded | null>(null)

  const openTaskAddedModal: TaskAddedContextProps['openTaskAddedModal'] = (
    task: Task,
    taskDifficultyIndex: number
  ) => {
    const points = task.difficulties[taskDifficultyIndex].points

    setTaskAdded({ emoji: task.emoji, points })
  }

  const closeTaskAddedModal = () => setTaskAdded(null)

  const taskAddedModalContextApi = useMemo(
    () => ({
      taskAdded,
      openTaskAddedModal,
      closeTaskAddedModal,
    }),
    [openTaskAddedModal, closeTaskAddedModal, taskAdded]
  )

  return (
    <TaskAddedModalContext.Provider value={taskAddedModalContextApi}>
      {children}
    </TaskAddedModalContext.Provider>
  )
}

export { TaskAddedModalContext, TaskAddedModalContextProvider }
