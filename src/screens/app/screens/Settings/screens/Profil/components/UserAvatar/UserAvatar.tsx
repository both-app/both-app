import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { getCameraPermission, uploadImage, deleteFromPath } from 'res/image'

import { Avatar } from 'library/components/Avatar'
import { IconButton } from 'library/components/IconButton'

import { UsersContext } from 'screens/app/contexts/Users.context'

const AVATAR_IMAGE_QUALITY = 0.1

export const UserAvatar = () => {
  const { me, updateUser } = useContext(UsersContext)

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

        // Delete the old avatar
        await deleteFromPath(me.avatarUrl)

        // Save the new avatar path
        updateUser({ avatarUrl: path, birthDate: '01/01/2001' })
      }
    } catch (error) {}
  }

  return (
    <View>
      <Avatar
        firstname={me.firstName}
        avatar={me.avatarUrl}
        avatarColor="skin100"
        backgroundColor="dark200"
        size="large"
        borderColor="skin100"
        borderWidth={4}
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
