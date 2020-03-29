import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'

export const Week: FC = ({ children }) => (
  <Text style={styles.week}>{children}</Text>
)

const styles = StyleSheet.create({
  week: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 14,
    marginBottom: 16,
  },
})
