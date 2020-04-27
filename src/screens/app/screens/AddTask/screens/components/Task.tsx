import React, { FC, useContext } from 'react'

import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { useT } from 'res/i18n'

interface TaskProps {
  task: Task
  category: Category
  selectedId: string
  onAction: (taskId: Task, difficulty?: number) => void
}

export const Task: FC<TaskProps> = ({
  task,
  category,
  selectedId,
  onAction,
}) => {
  const { t } = useT()
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
      subtitle={t('app:screen:newUserTask:chooseTask:levelOfDifficulity', {
        count: task.difficulties.length,
      })}
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
        marginBottom: 9,
      }}
    />
  )
}
