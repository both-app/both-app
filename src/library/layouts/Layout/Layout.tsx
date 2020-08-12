import React, { FC, ReactNode } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native'

import { colors } from 'res/colors'

interface LayoutProps {
  header: ReactNode
  center?: ReactNode
  centerTopPosition?: number
}

const PADDINGX = 24
const PADDINGY = 24

export const Layout: FC<LayoutProps> = ({
  children,
  header,
  center,
  centerTopPosition = -10,
}) => {
  const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0

  return (
    <View style={{ flex: 1, paddingTop }}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>{header}</View>
        </SafeAreaView>

        <SafeAreaView style={styles.body}>
          <View style={styles.body}>
            {!!center && (
              <View style={{ ...styles.center, top: centerTopPosition }}>
                {center}
              </View>
            )}
            {children}
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colors.skin100,
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark100,
  },
  header: {
    paddingHorizontal: PADDINGX,
    paddingVertical: PADDINGY,
    display: 'flex',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: colors.skin100,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'relative',
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
})
