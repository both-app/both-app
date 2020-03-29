import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { CardButton } from 'screens/app/components/CardButton'
import { colors } from 'res/colors'

interface TaskButtonProps {
  task: Task
  onAction: VoidFunction
}

export const TaskButton: FC<TaskButtonProps> = ({ task, onAction }) => (
  <CardButton
    containerStyle={styles.cardButtonContainer}
    activeContainerStyle={styles.activeCardButtonContainer}
    textStyle={styles.cardText}
    icon={task.icon}
    title={task.name}
    onAction={onAction}
    points={task.points}
  />
)

const styles = StyleSheet.create({
  cardButtonContainer: {
    backgroundColor: colors.beigeDark,
  },
  activeCardButtonContainer: {
    opacity: 0.5,
  },
  cardText: {
    color: colors.blueDark,
  },
  activeCardText: {
    color: 'white',
  },
})
