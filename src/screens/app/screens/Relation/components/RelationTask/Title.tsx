import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

interface TitleProps {
  isDone: boolean
}

export const Title: FC<TitleProps> = ({ children, isDone }) => (
  <Text
    style={{
      ...styles.title,
      ...(isDone ? styles.isDone : {}),
    }}
  >
    {children}
  </Text>
)

const styles = StyleSheet.create({
  title: {
    color: colors.dark200,
  },
  isDone: {
    textDecorationLine: 'line-through',
  },
})
