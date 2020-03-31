import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
import { Modal } from 'library/components/Modal'
import { Code } from './Code'

interface ShareCodeModalProps {
  visible: boolean
  onClose: VoidFunction
  onAction: VoidFunction
  code: string
}

export const ShareCodeModal: FC<ShareCodeModalProps> = ({
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
    <Badge color="highlight100">Invite Charlotte 💬</Badge>

    <Code code={code} />

    <View style={styles.infoContainer}>
      <Info
        color="white"
        primary="📲 Voici le code de te relation sur both "
        secondary="Partage le à ton acolyte pour qu’il te rejoigne !"
      />
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
})
