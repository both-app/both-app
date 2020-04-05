import React, { useContext } from 'react'
import { Share } from 'react-native'

import { ShareRelationKeyModal } from './ShareRelationKeyModal'
import { RelationContext } from 'screens/app/contexts/Relation.context'
import { setItem } from 'res/storage'

export const ShareRelationKeyModalContainer = () => {
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
        title: 'Join Both relation',
        message: `Coucou, retrouve moi sur both pour partager de l’amour et un peu de notre quotidien ! Télécharge l’app. en cliquant sur le lien ci-dessous et utilise la clé ${relation.code} pour me rejoindre ❤️`,
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
