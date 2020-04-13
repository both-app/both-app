import React, { FC, useContext } from 'react'

import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'

interface TaskProps {
  task: Task
  index: number
  selectedCategory: Category
  selectedTaskId: string
  onAction: (taskId: string, difficulty?: number) => void
}

export const Task: FC<TaskProps> = ({
  task,
  index,
  selectedCategory,
  selectedTaskId,
  onAction,
}) => {
  const { tasks, getPoints } = useContext(TaskContext)

  const handleOnAction = () => {
    if (task.difficulties.length > 0) {
      return onAction(task.id)
    }

    return onAction(task.id, 0)
  }

  return (
    <CardButton
      emoji={task.emoji}
      title={task.name}
      subtitle={`${task.difficulties.length} niveau de difficulé`}
      onAction={handleOnAction}
      activeBackgroundColor={selectedCategory?.color}
      activeTextColor="white"
      active={selectedTaskId === task.id}
      rightContent={<Point points={getPoints(task.id)} />}
      containerStyle={{
        marginTop: index === 0 ? 72 : 10,
        marginBottom: index === tasks.length - 1 ? 56 : 0,
      }}
    />
  )
}
