import React, { FC } from 'react'
import { Text, StyleSheet, View, ViewStyle, Image } from 'react-native'

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
}

export const Avatar: FC<AvatarProps> = ({
  firstname,
  size = 48,
  borderWidth = 4,
  borderColor,
  backgroundColor,
  avatarColor,
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

  return (
    <View style={avatarStyle}>
      {!!firstname && !avatarUrl && (
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
