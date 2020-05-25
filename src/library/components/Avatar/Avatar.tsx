import React, { FC } from 'react'
import { Text, StyleSheet, View, ViewStyle, Image } from 'react-native'

import { colors, Color } from 'res/colors'
import { fonts } from 'res/fonts'

export interface AvatarProps {
  firstname?: string
  avatar?: string | number
  size: 'large' | 'medium' | 'small'
  containerStyle?: ViewStyle
  borderColor?: Color
  borderWidth?: number
  backgroundColor?: Color
  avatarColor?: Color
}

export const Avatar: FC<AvatarProps> = ({
  firstname,
  size = 'medium',
  borderWidth = 4,
  borderColor,
  backgroundColor,
  avatarColor,
  containerStyle,
  avatar,
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

  const hasAvatar =
    // @ts-ignore
    (typeof avatar === 'string' && avatar.length > 0) || parseInt(avatar)

  const borderStyle = borderColor
    ? {
        borderWidth,
        borderColor: colors[borderColor],
      }
    : {}

  const avatarStyle = {
    ...styles.avatar,
    ...(containerStyle ? containerStyle : {}),
    width: sizeNumber,
    height: sizeNumber,
    borderRadius: sizeNumber / 2,
    ...borderStyle,
    ...(backgroundColor && !hasAvatar
      ? { backgroundColor: colors[backgroundColor] }
      : {}),
  }

  const avatarText = {
    ...styles.avatarText,
    ...(avatarColor ? { color: colors[avatarColor] } : {}),
    fontSize,
  }

  return (
    <View style={avatarStyle}>
      {!!firstname && !hasAvatar && (
        <Text style={avatarText}>{firstname[0].toUpperCase()}</Text>
      )}
      {!!hasAvatar && (
        <Image
          source={typeof avatar === 'string' ? { uri: avatar } : avatar}
          style={{
            width: sizeNumber,
            height: sizeNumber,
            borderRadius: sizeNumber / 2,
            ...borderStyle,
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.skin100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
  },
})
