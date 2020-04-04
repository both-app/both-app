import React, { useState, useEffect, useContext } from 'react'
import { useActionSheet } from '@expo/react-native-action-sheet'

import { colors } from 'res/colors'

import { Avatar } from 'library/components/Avatar'
import { Icon } from 'library/components/Icon'
import { CameraContext } from '../../../Camera/Camera.context'
import { useImagePicker } from './useImagePicker'

export const AvatarContainer = () => {
  const [isUploadingAvatar, setIsUploading] = useState<boolean>(false)
  const { setCameraIsOpen, lastPictureTaken } = useContext(CameraContext)
  const { showActionSheetWithOptions } = useActionSheet()
  const { openImagePicker } = useImagePicker()

  useEffect(() => {
    if (lastPictureTaken) {
      setIsUploading(true)
    }
  }, [lastPictureTaken])

  const openActionSheet = () => {
    const options = [
      'Faire un beau selfie 📸',
      'Choisir une photo 😎',
      'Annuler',
    ]
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          setCameraIsOpen(true)
        } else if (buttonIndex === 1) {
          const result = await openImagePicker()

          if (!result.cancelled) {
            setIsUploading(true)
          }
        }

        return null
      }
    )
  }

  return (
    <Avatar size="medium" onAction={openActionSheet} backgroundColor="dark200">
      <Icon
        iconName={isUploadingAvatar ? 'loader' : 'camera'}
        width={32}
        height={32}
        style={{ color: colors.white }}
      />
    </Avatar>
  )
}
