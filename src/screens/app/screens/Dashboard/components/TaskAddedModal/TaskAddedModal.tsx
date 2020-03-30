import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { Info } from '../Header'
import { Counter } from './Counter'

import { Badge } from 'library/components/Badge'
import { Modal } from 'library/components/Modal'

interface TaskAddedModalProps {
  visible: boolean
  onClose: VoidFunction
  onAction: VoidFunction
  task?: Task
}

export const TaskAddedModal: FC<TaskAddedModalProps> = ({
  visible,
  onClose,
  onAction,
  task,
}) => (
  <Modal
    visible={visible}
    emoji={task?.icon}
    onClose={onClose}
    onAction={onAction}
    primaryActionIconName="check"
  >
    <Badge color={colors.green}>Bravo Mathieu 🎉</Badge>

    <Counter points={task?.points} />

    <Info
      containerStyle={styles.infoContainer}
      primary="👏 On vient de les ajouter à ton compteur"
      secondary="Continue comme ça !"
    />
  </Modal>
)

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
})
