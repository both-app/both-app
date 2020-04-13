import React, { FC } from 'react'

import { useT } from 'res/i18n'

import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

interface TaskDifficultyProps {
  taskDifficulty: TaskDifficulty
  taskDifficultyIndex: number
  color: string
  selectedIndex: number
  onAction: (taskDifficultyIndex: number) => void
  isFirstItem: boolean
  isLastItem: boolean
}

export const TaskDifficulty: FC<TaskDifficultyProps> = ({
  taskDifficulty,
  taskDifficultyIndex,
  color,
  selectedIndex,
  onAction,
  isFirstItem,
  isLastItem,
}) => {
  const { t } = useT()

  const difficultyTitle = t(`app:difficulty:${taskDifficulty.points || 1}`)

  const handleOnAction = () => onAction(taskDifficultyIndex)

  return (
    <CardButton
      emoji={taskDifficulty.emoji}
      title={difficultyTitle}
      subtitle={taskDifficulty.name}
      onAction={handleOnAction}
      active={selectedIndex === taskDifficultyIndex}
      activeBackgroundColor={color}
      activeTextColor="white"
      containerStyle={{
        marginTop: isFirstItem ? 72 : 10,
        marginBottom: isLastItem ? 56 : 0,
      }}
      rightContent={<Point points={taskDifficulty.points} />}
    />
  )
}
