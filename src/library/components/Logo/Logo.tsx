import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LogoIcon from '../../../../assets/logo.svg'
import { colors } from '../../../res/colors'

export const Logo = () => (
  <View style={styles.container}>
    <LogoIcon width={60} />
    <Text style={styles.text}>both</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'gotham-medium',
    fontSize: 60,
    color: colors.greyDark,
    marginLeft: 10,
  },
})
