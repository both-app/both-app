import React, { useContext, useEffect } from 'react'
import * as Haptics from 'expo-haptics'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { TaskAddedModalContext } from 'screens/app/contexts/TaskAddedModal.context'

import { TaskAddedModal } from './TaskAddedModal'

export const TaskAddedModalContainer = () => {
  const { me } = useContext(UsersContext)
  const { taskAdded, closeTaskAddedModal, modalIsOpen } = useContext(
    TaskAddedModalContext
  )

  useEffect(() => {
    if (modalIsOpen) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }, [modalIsOpen])

  return (
    <TaskAddedModal
      visible={modalIsOpen}
      userFirstName={me.firstName}
      points={taskAdded?.points}
      emoji={taskAdded?.emoji}
      onAction={closeTaskAddedModal}
      onClose={closeTaskAddedModal}
    />
  )
}
