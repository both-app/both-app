import React, { useState } from 'react'
import { Share } from 'react-native'

import { ShareCodeModal } from './ShareCodeModal'

const CODE = '000000'

export const ShareCodeModalContainer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true)

  const handleOnClose = () => {
    setModalIsOpen(false)
  }

  const handleOnAction = async () => {
    try {
      await Share.share({
        title: 'Join Both relation',
        message: `Code: ${CODE}`,
      })
    } finally {
      handleOnClose()
    }
  }

  return (
    <ShareCodeModal
      code={CODE}
      visible={modalIsOpen}
      onAction={handleOnAction}
      onClose={handleOnClose}
    />
  )
}
