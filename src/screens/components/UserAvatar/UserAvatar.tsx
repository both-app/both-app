import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { getCameraPermission, uploadImage } from 'res/image'

import { Avatar, AvatarProps } from 'library/components/Avatar'
import { IconButton } from 'library/components/IconButton'

interface UserAvatarProps extends Partial<AvatarProps> {
  firstName: string
  avatarUrl?: string
  onAvatarUploaded: (path: string) => void
  onError?: VoidFunction
}

const AVATAR_IMAGE_QUALITY = 0.1

export const UserAvatar: FC<UserAvatarProps> = ({
  firstName,
  avatarUrl,
  onAvatarUploaded,
  onError,
  ...props
}) => {
  const handleOnTakePicture = async () => {
    await getCameraPermission()

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: AVATAR_IMAGE_QUALITY,
      })

      if (!result.cancelled) {
        // @ts-ignore
        const path = await uploadImage('avatar', result.uri)
        onAvatarUploaded(path)
      }
    } catch (error) {
      onError && onError()
    }
  }

  return (
    <View>
      <Avatar
        firstname={firstName}
        avatar={avatarUrl}
        avatarColor="skin100"
        backgroundColor="dark200"
        size="large"
        borderColor="skin100"
        borderWidth={4}
        {...props}
      />

      <IconButton
        iconName="camera"
        onAction={handleOnTakePicture}
        iconColor="white"
        buttonColor="highlight100"
        size={32}
        radius={12}
        iconSize={16}
        buttonStyle={styles.takePictureButton}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  takePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
})
