import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Color, colors } from 'res/colors'

interface BadgeProps {
  color: Color
}

export const Badge: FC<BadgeProps> = ({ color, children }) => {
  const badgeStyle = {
    ...styles.badge,
    backgroundColor: colors[color],
  }

  return (
    <View style={badgeStyle}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 2,
    paddingTop: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
})
