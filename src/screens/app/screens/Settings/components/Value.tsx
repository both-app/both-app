import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { colors } from 'res/colors'

interface ValueProps {
  label: string
  value: string
  marginBottom: number
}

export const Value: FC<ValueProps> = ({ label, value, marginBottom }) => (
  <View style={{ marginBottom }}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

export const styles = StyleSheet.create({
  label: {
    color: colors.grey100,
  },
  value: {
    color: colors.dark200,
    textTransform: 'capitalize',
  },
})
