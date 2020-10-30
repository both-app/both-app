import React, { FC, useContext } from 'react'

import { useT } from 'res/i18n'

import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'
import { Badge } from 'library/components/Badge'

import { TaskContext } from 'screens/app/contexts/Task.context'

interface TaskProps {
  task: Task
  category?: Category
  isNew?: boolean
  selectedId?: string
  disabled?: boolean
  onAction?: (taskId: Task, difficulty?: number) => void
}

export const Task: FC<TaskProps> = ({
  task,
  category,
  isNew,
  selectedId,
  onAction,
  disabled,
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
      badge={
        isNew ? (
          <Badge size="xs" color="highlight100">
            {t('new')}
          </Badge>
        ) : null
      }
      subtitle={t('levelOfDifficulity', {
        count: task.difficulties.length,
      })}
      onAction={onAction && handleOnAction}
      activeBackgroundColor={category?.color}
      disabled={disabled}
      activeTextColor="white"
      active={selectedId === task.id}
      rightContent={
        <Point
          // @ts-ignore
          points={getPoints(task.id)}
          shape={isTaskWithDifficulties ? 'rectangle' : 'circle'}
        />
      }
      containerStyle={{
        marginBottom: 8,
        ...(isNew ? { paddingTop: 16, paddingBottom: 16 } : {}),
      }}
    />
  )
}
