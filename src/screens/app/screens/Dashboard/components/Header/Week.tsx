import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

export const Week: FC = ({ children }) => (
  <Text style={styles.week}>{children}</Text>
)

const styles = StyleSheet.create({
  week: {
    color: colors.white,
    justifyContent: 'center',
    fontSize: 14,
    marginBottom: 16,
  },
})
