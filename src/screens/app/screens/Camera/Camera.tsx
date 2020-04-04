import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { Camera } from 'expo-camera'

import { colors } from 'res/colors'

import { MinimalButton } from 'library/components/MinimalButton'
import { Icon } from 'library/components/Icon'
import { CameraContext } from './Camera.context'

export const BCamera = () => {
  const cameraElement = useRef()
  const { setCameraIsOpen, setPicture } = useContext(CameraContext)
  const [type, setType] = useState(Camera.Constants.Type.back)

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestPermissionsAsync()

      if (status !== 'granted') {
        closeCamera()
      }
    }

    requestPermissions()
  }, [])

  const switchCameraType = () => {
    if (type === Camera.Constants.Type.back) {
      return setType(Camera.Constants.Type.front)
    }

    return setType(Camera.Constants.Type.back)
  }

  const closeCamera = () => setCameraIsOpen(false)

  const takePicture = async () => {
    // @ts-ignore
    const picture = await cameraElement.current.takePictureAsync()

    setPicture(picture)
    closeCamera()
  }

  return (
    <View style={styles.viewContainer}>
      <StatusBar hidden />
      <Camera ref={cameraElement} style={styles.cameraContainer} type={type}>
        <View style={styles.bottomContainer}>
          <MinimalButton
            iconColor="white"
            iconName="close"
            width={25}
            height={25}
            onAction={closeCamera}
          />

          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Icon iconName="camera" color="white" width={30} height={30} />
          </TouchableOpacity>

          <MinimalButton
            iconColor="white"
            iconName="rotate"
            width={25}
            height={25}
            onAction={switchCameraType}
          />
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: colors.dark100,
    borderWidth: 3,
    borderColor: colors.highlight200,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
