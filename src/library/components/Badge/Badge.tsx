import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Color, colors } from 'res/colors'

interface BadgeProps {
  color: Color
  size?: 'xs' | 's'
}

export const Badge: FC<BadgeProps> = ({ color, children, size = 's' }) => {
  const badgeStyle = {
    borderRadius: size === 's' ? 8 : 4,
    paddingHorizontal: size === 's' ? 8 : 4,
    paddingVertical: size === 's' ? 2 : 3,
    backgroundColor: colors[color],
  }

  const textStyle = {
    ...styles.text,
    fontSize: size === 's' ? 14 : 8,
  }

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: colors.white,
  },
})
