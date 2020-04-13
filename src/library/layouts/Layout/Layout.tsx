import React, { useCallback, FC, ReactNode } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { colors } from 'res/colors'

interface LayoutProps {
  header: ReactNode
  badge?: ReactNode
}

const PADDINGX = 24
const PADDINGY = 24

export const Layout: FC<LayoutProps> = ({ children, header, badge }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>{header}</View>

      <View style={styles.body}>
        <View style={styles.badge}>{badge}</View>
        {children}
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark100,
    paddingTop: 65,
  },
  header: {
    paddingLeft: PADDINGX,
    paddingRight: PADDINGX,
    paddingBottom: PADDINGY,
    display: 'flex',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: colors.skin100,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: PADDINGY,
    paddingLeft: PADDINGX,
    paddingRight: PADDINGX,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})