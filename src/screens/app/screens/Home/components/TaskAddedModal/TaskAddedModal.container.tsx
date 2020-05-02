import React, { useContext, useEffect } from 'react'
import * as Haptics from 'expo-haptics'

import { TaskAddedModal } from './TaskAddedModal'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { TaskAddedModalContext } from './TaskAddedModal.context'

export const TaskAddedModalContainer = () => {
  const { me } = useContext(UsersContext)
  const { taskAdded, closeTaskAddedModal } = useContext(TaskAddedModalContext)

  useEffect(() => {
    if (taskAdded) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }, [taskAdded])

  return (
    <TaskAddedModal
      visible={!!taskAdded}
      userFirstName={me.firstName}
      points={taskAdded?.points}
      emoji={taskAdded?.emoji}
      onAction={closeTaskAddedModal}
      onClose={closeTaskAddedModal}
    />
  )
}
