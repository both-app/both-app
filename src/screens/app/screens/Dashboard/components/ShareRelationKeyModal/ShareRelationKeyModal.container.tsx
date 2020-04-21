import React, { useContext, useEffect } from 'react'
import { Share } from 'react-native'

import { useT } from 'res/i18n'

import { ShareRelationKeyModal } from './ShareRelationKeyModal'
import { RelationContext } from 'screens/app/contexts/Relation.context'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const ShareRelationKeyModalContainer = () => {
  const { t } = useT()
  const { me, partner } = useContext(UsersContext)
  const { shareKeyModalOpen, relation, setShareKeyModal } = useContext(
    RelationContext
  )

  useEffect(() => {
    if (me.id && !partner.id && !shareKeyModalOpen) {
      setShareKeyModal(true)
    }
  }, [me, partner])

  const handleOnClose = async () => {
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
