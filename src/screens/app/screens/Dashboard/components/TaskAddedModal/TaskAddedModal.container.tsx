import React, { useContext, useState, useEffect } from 'react'
import * as Haptics from 'expo-haptics'

import { TaskAddedModal } from './TaskAddedModal'
import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const TaskAddedModalContainer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [taskAdded, setTaskAdded] = useState<Task>()
  const { me } = useContext(UsersContext)
  const { getTaskById, taskIdCompleted, setTaskIdCompleted } = useContext(
    TaskContext
  )

  useEffect(() => {
    if (taskIdCompleted) {
      const taskAdded = getTaskById(taskIdCompleted)
      setTaskAdded(taskAdded)

      setTimeout(async () => {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        )

        setModalIsOpen(true)
      }, 100)
    }
  }, [taskIdCompleted])

  const handleOnClose = () => {
    setModalIsOpen(false)
    setTaskIdCompleted('')
  }

  return (
    <TaskAddedModal
      userFirstName={me.firstName}
      task={taskAdded}
      visible={modalIsOpen}
      onAction={handleOnClose}
      onClose={handleOnClose}
    />
  )
}
