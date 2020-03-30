import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { Info } from '../Header'
import { Counter } from './Counter'

import { Badge } from 'library/components/Badge'
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
    <Badge color={colors.purple}>Invite Charlotte 💬</Badge>

    <Code code={code} />

    <Info
      containerStyle={styles.infoContainer}
      primary="📲 Voici le code de te relation sur both "
      secondary="Partage le à ton acolyte pour qu’il te rejoigne !"
    />
  </Modal>
)

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
})
