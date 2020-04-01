import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

export const Header: FC = ({ children }) => (
  <View style={styles.headerContainer}>{children}</View>
)

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.dark100,
  },
})
