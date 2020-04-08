import React, { useContext } from 'react'
import { Share } from 'react-native'

import { setItem } from 'res/storage'
import { useT } from 'res/i18n'

import { ShareRelationKeyModal } from './ShareRelationKeyModal'
import { RelationContext } from 'screens/app/contexts/Relation.context'

export const ShareRelationKeyModalContainer = () => {
  const { t } = useT()
  const { shareKeyModalOpen, relation, setShareKeyModal } = useContext(
    RelationContext
  )

  const handleOnClose = async () => {
    await setItem('shareKeyModalInited', true)
    setShareKeyModal(false)
  }

  const handleOnAction = async () => {
    try {
      await Share.share({
        title: t('modal:shareRelationKey:shareBySMS:title'),
        message: t('modal:shareRelationKey:shareBySMS:message', {
          code: relation.code,
        }),
      })
    } finally {
      handleOnClose()
    }
  }

  return (
    <ShareRelationKeyModal
      code={relation.code}
      visible={shareKeyModalOpen}
      onAction={handleOnAction}
      onClose={handleOnClose}
    />
  )
}
