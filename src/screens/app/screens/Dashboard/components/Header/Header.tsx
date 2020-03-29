import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

export const Header: FC = ({ children }) => (
  <View style={styles.headerContainer}>{children}</View>
)

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 80,
    paddingLeft: 24,
    paddingRight: 24,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.blueDark,
  },
})
