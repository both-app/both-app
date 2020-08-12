import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

interface SubtitleProps {
  isDone: boolean
}

export const Subtitle: FC<SubtitleProps> = ({ children, isDone }) => (
  <Text
    style={{
      ...styles.subtitle,
      ...(isDone ? styles.isDone : {}),
    }}
  >
    {children}
  </Text>
)

const styles = StyleSheet.create({
  subtitle: {
    color: colors.dark200,
    opacity: 0.65,
  },
  isDone: {
    textDecorationLine: 'line-through',
  },
})
