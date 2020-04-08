import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { useT } from 'res/i18n'

import { Counter } from './Counter'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
import { Modal } from 'library/components/Modal'

interface TaskAddedModalProps {
  userFirstName: string
  visible: boolean
  onClose: VoidFunction
  onAction: VoidFunction
  task?: Task
}

export const TaskAddedModal: FC<TaskAddedModalProps> = ({
  userFirstName,
  visible,
  onClose,
  onAction,
  task,
}) => {
  const { t } = useT()

  return (
    <Modal
      visible={visible}
      emoji={task?.emoji}
      onClose={onClose}
      onAction={onAction}
      primaryActionIconName="check"
    >
      <Badge color="success">
        {t('modal:newTaskAdded:badgeText', { firstName: userFirstName })}
      </Badge>

      <Counter points={task?.points} />

      <View style={styles.infoContainer}>
        <Info
          color="white"
          primary={t('modal:newTaskAdded:info:primary')}
          secondary={t('modal:newTaskAdded:info:secondary')}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
})
