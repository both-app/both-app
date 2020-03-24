import React, { FC } from 'react'
import { Text, StyleSheet, TextProps } from 'react-native'
import { colors } from '../../../res/colors'

export const Label: FC<TextProps> = (props) => (
  <Text style={styles.label} {...props} />
)

const styles = StyleSheet.create({
  label: {
    fontFamily: 'gotham-medium',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.pink,
    marginBottom: 15,
  },
})
