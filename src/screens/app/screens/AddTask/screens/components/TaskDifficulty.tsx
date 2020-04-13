import React, { FC } from 'react'

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
  const DIFFICULTY_NAME_MAPPING = {
    1: 'Les doigts dans le nez',
    2: 'Ca va...',
    3: 'Contraignant',
    4: 'Difficile',
    5: 'Épuisant',
  }

  return (
    <CardButton
      emoji={taskDifficulty.emoji}
      title={DIFFICULTY_NAME_MAPPING[taskDifficulty.points]}
      subtitle={taskDifficulty.name}
      onAction={() => onAction(taskDifficultyIndex)}
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
