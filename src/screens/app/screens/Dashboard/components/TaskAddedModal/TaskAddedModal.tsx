import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Counter } from './Counter'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
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
    emoji={task?.emoji}
    onClose={onClose}
    onAction={onAction}
    primaryActionIconName="check"
  >
    <Badge color="success">Bravo Mathieu 🎉</Badge>

    <Counter points={task?.points} />

    <View style={styles.infoContainer}>
      <Info
        color="white"
        primary="👏 On vient de les ajouter à ton compteur"
        secondary="Continue comme ça !"
      />
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
})
