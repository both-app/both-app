import React, { useState } from 'react'
import { Share } from 'react-native'

import { ShareRelationKeyModal } from './ShareRelationKeyModal'

const CODE = '000000'

export const ShareRelationKeyModalContainer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleOnClose = () => {
    setModalIsOpen(false)
  }

  const handleOnAction = async () => {
    try {
      await Share.share({
        title: 'Join Both relation',
        message: `Coucou, retrouve moi sur both pour partager de l’amour et un peu de notre quotidien ! Télécharge l’app. en cliquant sur le lien ci-dessous et utilise la clé ${CODE} pour me rejoindre ❤️`,
      })
    } finally {
      handleOnClose()
    }
  }

  return (
    <ShareRelationKeyModal
      code={CODE}
      visible={modalIsOpen}
      onAction={handleOnAction}
      onClose={handleOnClose}
    />
  )
}
