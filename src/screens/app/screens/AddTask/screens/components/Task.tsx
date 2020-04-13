import React, { FC, useContext } from 'react'

import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'

interface TaskProps {
  task: Task
  category: Category
  selectedId: string
  onAction: (taskId: Task, difficulty?: number) => void
  isFirstItem: boolean
  isLastItem: boolean
}

export const Task: FC<TaskProps> = ({
  task,
  category,
  selectedId,
  onAction,
  isFirstItem,
  isLastItem,
}) => {
  const isTaskWithDifficulties = task.difficulties.length > 1
  const { getPoints } = useContext(TaskContext)

  const handleOnAction = () => {
    if (isTaskWithDifficulties) {
      return onAction(task)
    }

    return onAction(task, 0)
  }

  return (
    <CardButton
      emoji={task.emoji}
      title={task.name}
      subtitle={`${task.difficulties.length} niveau de difficulé`}
      onAction={handleOnAction}
      activeBackgroundColor={category?.color}
      activeTextColor="white"
      active={selectedId === task.id}
      rightContent={
        <Point
          points={getPoints(task.id)}
          shape={isTaskWithDifficulties ? 'rectangle' : 'circle'}
        />
      }
      containerStyle={{
        marginTop: isFirstItem ? 72 : 10,
        marginBottom: isLastItem ? 56 : 0,
      }}
    />
  )
}
