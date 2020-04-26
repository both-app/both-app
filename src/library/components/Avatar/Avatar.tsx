import React, { FC } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native'

import { colors, Color } from 'res/colors'
import { fonts } from 'res/fonts'

interface AvatarProps {
  firstname?: string
  avatarUrl?: any
  size: 'large' | 'medium' | 'small'
  containerStyle?: ViewStyle
  borderColor?: Color
  borderWidth?: number
  backgroundColor?: Color
  avatarColor?: Color
  onAction?: VoidFunction
}

export const Avatar: FC<AvatarProps> = ({
  firstname,
  size = 48,
  borderWidth = 4,
  borderColor,
  backgroundColor,
  avatarColor,
  onAction,
  containerStyle,
  avatarUrl,
}) => {
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

  const avatarStyle = {
    ...styles.avatar,
    width: sizeNumber,
    height: sizeNumber,
    borderRadius: sizeNumber / 2,
    ...(containerStyle ? containerStyle : {}),
    ...(backgroundColor ? { backgroundColor: colors[backgroundColor] } : {}),
    ...(borderColor
      ? {
          borderWidth,
          borderColor: colors[borderColor],
        }
      : {}),
  }

  const avatarText = {
    ...styles.avatarText,
    ...(avatarColor ? { color: colors[avatarColor] } : {}),
    fontSize,
  }

  const handleOnPress = () => onAction && onAction()

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleOnPress}>
      <View style={avatarStyle}>
        {!!firstname && (
          <Text style={avatarText}>{firstname[0].toUpperCase()}</Text>
        )}
        {!!avatarUrl && (
          <Image
            source={avatarUrl}
            style={{
              width: sizeNumber,
              height: sizeNumber,
              borderRadius: sizeNumber / 2,
            }}
          />
        )}
      </View>
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
