import React, { useContext, useState, useEffect } from 'react'
import { TaskAddedModal } from './TaskAddedModal'
import { TaskContext } from 'screens/app/contexts/Task.context'

export const TaskAddedModalContainer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [taskAdded, setTaskAdded] = useState<Task>()
  const { getTaskById, taskIdCompleted, setTaskIdCompleted } = useContext(
    TaskContext
  )

  useEffect(() => {
    if (taskIdCompleted) {
      const taskAdded = getTaskById(taskIdCompleted)
      setTaskAdded(taskAdded)

      setTimeout(() => {
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
      task={taskAdded}
      visible={modalIsOpen}
      onAction={handleOnClose}
      onClose={handleOnClose}
    />
  )
}
