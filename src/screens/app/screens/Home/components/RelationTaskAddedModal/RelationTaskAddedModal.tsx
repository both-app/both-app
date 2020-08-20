import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

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
  return (
    <Modal
      visible={visible}
      emoji="👋"
      onClose={onClose}
      onAction={onAction}
      primaryActionIconName="check"
    >
      <Badge color="highlight200">On a prévenu {userFirstName} 😎</Badge>

      <View style={styles.infoContainer}>
        <Info
          color="white"
          primary="🙏 Bonne initiative"
          secondary="Tu peux désormais suivre ta demande d’aide depuis la page Relation afin de savoir si ton partenaire a réalisé la tâche ou non afin de pouvoir gentiment le relancer si nécessaire..."
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
