import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

import Both from '../../../../../assets/both.svg'

export const Logo = () => (
  <View style={styles.container} testID="logo">
    <Both />
    <Text style={styles.text}>Share love & daily tasks</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.white,
    marginTop: 18,
  },
})
