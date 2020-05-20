import React, { FC } from 'react'
import { Text, StyleSheet, View, ViewStyle, Image } from 'react-native'

import { colors, Color } from 'res/colors'
import { fonts } from 'res/fonts'

interface AvatarProps {
  firstname?: string
  avatar?: any
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

  const avatarStyle = {
    ...styles.avatar,
    width: sizeNumber,
    height: sizeNumber,
    borderRadius: sizeNumber / 2,
    ...(containerStyle ? containerStyle : {}),
    ...(backgroundColor && !avatar
      ? { backgroundColor: colors[backgroundColor] }
      : {}),
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

  const avatarSource = typeof avatar === 'string' ? { uri: avatar } : avatar

  return (
    <View style={avatarStyle}>
      {!!firstname && !avatar && (
        <Text style={avatarText}>{firstname[0].toUpperCase()}</Text>
      )}
      {!!avatar && (
        <Image
          source={avatarSource}
          style={{
            width: sizeNumber,
            height: sizeNumber,
            borderRadius: sizeNumber / 2,
            ...(borderColor
              ? {
                  borderWidth,
                  borderColor: colors[borderColor],
                }
              : {}),
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
