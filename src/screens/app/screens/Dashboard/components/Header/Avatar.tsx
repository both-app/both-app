import React, { useEffect, FC } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'

import { useRotationAnimation } from 'library/hooks/useRotationEffect'
import { colors } from 'res/colors'
import { fonts } from 'res/fonts'

interface AvatarProps {
  isLoading?: boolean
  firstname: string
}

export const Avatar: FC<AvatarProps> = ({ firstname, isLoading }) => {
  const { rotateData, startRotate } = useRotationAnimation({
    iteration: -1,
    rotationDuration: 5000,
    delayBetweenRotations: 3000,
  })

  useEffect(() => {
    if (isLoading) {
      startRotate()
    }
  }, [isLoading])

  const avatarStyle = {
    ...styles.avatar,
    transform: [{ rotate: rotateData }],
  }

  return (
    <Animated.View style={avatarStyle}>
      <Text style={styles.avatarText}>{isLoading ? '⏳' : firstname}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: colors.skin100,
    borderWidth: 1,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
  },
})
