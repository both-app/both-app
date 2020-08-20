import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { useT } from 'res/i18n'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
import { Modal } from 'library/components/Modal'

interface RelationTaskAddedModalProps {
  userFirstName: string
  visible: boolean
  onClose: VoidFunction
  onAction: VoidFunction
}

export const RelationTaskAddedModal: FC<RelationTaskAddedModalProps> = ({
  userFirstName,
  visible,
  onClose,
  onAction,
}) => {
  const { t } = useT()

  return (
    <Modal
      visible={visible}
      emoji="👋"
      onClose={onClose}
      onAction={onAction}
      primaryActionIconName="check"
    >
      <Badge color="highlight200">
        {t('modal:newRelationTaskAdded:badgeText', {
          firstName: userFirstName,
        })}
      </Badge>

      <View style={styles.infoContainer}>
        <Info
          color="white"
          primary={t('modal:newRelationTaskAdded:info:primary')}
          secondary={t('modal:newRelationTaskAdded:info:secondary')}
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
