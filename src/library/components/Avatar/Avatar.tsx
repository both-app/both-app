import React, { useEffect, FC } from 'react'
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'

import { colors, Color } from 'res/colors'
import { fonts } from 'res/fonts'

import { useRotationAnimation } from './useRotationEffect'

interface AvatarProps {
  isLoading?: boolean
  firstname?: string
  size: 'large' | 'medium' | 'small'
  borderColor?: Color
  backgroundColor?: Color
  onAction?: VoidFunction
}

export const Avatar: FC<AvatarProps> = ({
  firstname,
  children,
  isLoading,
  size = 48,
  borderColor,
  backgroundColor,
  onAction,
}) => {
  const { rotateData, startRotate } = useRotationAnimation({
    iteration: -1,
    rotationDuration: 2000,
    delayBetweenRotations: 3000,
  })

  const sizeNumber = {
    large: 120,
    medium: 88,
    small: 48,
  }[size]

  const fontSize = {
    large: 65,
    medium: 47,
    small: 26,
  }[size]

  useEffect(() => {
    if (isLoading) {
      startRotate()
    }
  }, [isLoading])

  const avatarStyle = {
    ...styles.avatar,
    width: sizeNumber,
    height: sizeNumber,
    borderRadius: sizeNumber / 2,
    ...(backgroundColor ? { backgroundColor: colors[backgroundColor] } : {}),
    ...(borderColor
      ? {
          borderWidth: 4,
          borderColor: colors[borderColor],
        }
      : {}),
    transform: [{ rotate: rotateData }],
  }

  const avatarText = {
    ...styles.avatarText,
    fontSize,
  }

  const handleOnPress = () => onAction && onAction()

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleOnPress}>
      <Animated.View style={avatarStyle}>
        {firstname && <Text style={avatarText}>{firstname[0]}</Text>}
        {children}
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.skin100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
  },
})
