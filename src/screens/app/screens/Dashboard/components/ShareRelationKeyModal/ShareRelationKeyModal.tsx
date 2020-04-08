import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
import { Modal } from 'library/components/Modal'
import { Code } from './Code'
import { useT } from 'res/i18n'

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
}) => {
  const { t } = useT()

  return (
    <Modal
      visible={visible}
      emoji="💌"
      onClose={onClose}
      onAction={onAction}
      primaryActionIconName="share"
    >
      <Badge color="highlight100">
        {t('modal:shareRelationKey:badgeText')}
      </Badge>

      <Code code={code} />

      <View style={styles.infoContainer}>
        <Info
          color="white"
          primary={t('modal:shareRelationKey:info:primary')}
          secondary={t('modal:shareRelationKey:info:secondary')}
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
