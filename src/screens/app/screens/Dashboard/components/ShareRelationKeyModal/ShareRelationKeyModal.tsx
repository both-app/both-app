import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
import { Modal } from 'library/components/Modal'
import { Code } from './Code'

interface ShareRelationKeyModalProps {
  visible: boolean
  onClose: VoidFunction
  onAction: VoidFunction
  code: string
}

export const ShareRelationKeyModal: FC<ShareRelationKeyModalProps> = ({
  visible,
  onClose,
  onAction,
  code,
}) => (
  <Modal
    visible={visible}
    emoji="💌"
    onClose={onClose}
    onAction={onAction}
    primaryActionIconName="share"
  >
    <Badge color="highlight100">Invite ton acolyte 💬</Badge>

    <Code code={code} />

    <View style={styles.infoContainer}>
      <Info
        color="white"
        primary="📲 Voici la clé de te relation sur Both"
        secondary="Partage la à ton acolyte pour qu’il te rejoigne !"
      />
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
})
