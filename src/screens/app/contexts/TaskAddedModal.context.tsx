import React, { FC, createContext, useMemo, useState } from 'react'

import { wait } from 'res/utils'

interface TaskAdded {
  emoji: string
  points: number
}

interface TaskAddedContextProps {
  openTaskAddedModal: (emoji: string, points: number) => void
  closeTaskAddedModal: () => void
  taskAdded: TaskAdded
  modalIsOpen: boolean
}

// @ts-ignore
const TaskAddedModalContext = createContext<TaskAddedContextProps>({})

const TaskAddedModalContextProvider: FC = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [taskAdded, setTaskAdded] = useState<TaskAdded | null>(null)

  const openTaskAddedModal: TaskAddedContextProps['openTaskAddedModal'] = (
    emoji: string,
    points: number
  ) => {
    setTaskAdded({ emoji, points })
    setModalIsOpen(true)
  }

  const closeTaskAddedModal = async () => {
    setModalIsOpen(false)
    await wait(1000)
    setTaskAdded(null)
  }

  const taskAddedModalContextApi = useMemo(
    () => ({
      taskAdded,
      modalIsOpen,
      openTaskAddedModal,
      closeTaskAddedModal,
    }),
    [taskAdded, modalIsOpen, openTaskAddedModal, closeTaskAddedModal]
  )

  return (
    <TaskAddedModalContext.Provider value={taskAddedModalContextApi}>
      {children}
    </TaskAddedModalContext.Provider>
  )
}

export { TaskAddedModalContext, TaskAddedModalContextProvider }
