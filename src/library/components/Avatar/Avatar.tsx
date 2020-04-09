import React, { useEffect, FC } from 'react'
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native'

import { colors, Color } from 'res/colors'
import { fonts } from 'res/fonts'

import { useRotationAnimation } from './useRotationEffect'

interface AvatarProps {
  isLoading?: boolean
  firstname?: string
  avatarUrl?: any
  size: 'large' | 'medium' | 'small'
  containerStyle?: ViewStyle
  borderColor?: Color
  backgroundColor?: Color
  avatarColor?: Color
  onAction?: VoidFunction
}

export const Avatar: FC<AvatarProps> = ({
  firstname,
  isLoading,
  size = 48,
  borderColor,
  backgroundColor,
  avatarColor,
  onAction,
  containerStyle,
  avatarUrl,
}) => {
  const { rotateData, startRotate, stopRotate } = useRotationAnimation({
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
    } else {
      stopRotate()
    }
  }, [isLoading])

  const avatarStyle = {
    ...styles.avatar,
    width: sizeNumber,
    height: sizeNumber,
    borderRadius: sizeNumber / 2,
    ...(containerStyle ? containerStyle : {}),
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
    ...(avatarColor ? { color: colors[avatarColor] } : {}),
    fontSize,
  }

  const handleOnPress = () => onAction && onAction()

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleOnPress}>
      <Animated.View style={avatarStyle}>
        {firstname && <Text style={avatarText}>{firstname[0]}</Text>}
        {avatarUrl && (
          <Image
            source={avatarUrl}
            style={{
              width: sizeNumber,
              height: sizeNumber,
              borderRadius: sizeNumber / 2,
            }}
          />
        )}
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
