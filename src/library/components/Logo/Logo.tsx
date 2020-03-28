import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Both from '../../../../assets/both.svg'
import { colors } from 'res/colors'

export const Logo = () => (
  <View style={styles.container}>
    <Both />
    <Text style={styles.text}>Share love & daily tasks</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.blueDark,
    marginTop: 18,
  },
})
