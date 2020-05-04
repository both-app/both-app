import React, { FC, ReactNode, useCallback, memo } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  StatusBarStyle,
  Platform,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { colors, Color } from 'res/colors'

import { Label } from '../Label'

interface HeaderProps {
  title?: string
  leftButton?: ReactNode
  backgroundColor: Color
  statusBarStyle: StatusBarStyle
}

export const Header: FC<HeaderProps> = memo(
  ({ title, leftButton, backgroundColor, statusBarStyle }) => {
    useFocusEffect(
      useCallback(() => {
        StatusBar.setBarStyle(statusBarStyle)
      }, [])
    )

    const minimumHeight = Platform.select({
      ios: 65,
      android: 45,
    })

    return (
      <View
        style={{
          backgroundColor: colors[backgroundColor],
          height: minimumHeight + 32,
        }}
      >
        <View style={{ height: minimumHeight }} />

        <View style={styles.container}>
          <View style={{ width: 30, marginTop: 5 }}>{leftButton}</View>

          <View style={{ flex: 1 }}>
            {!!title && <Label primary={title} />}
          </View>

          <View style={{ width: 30 }}></View>
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
  },
})
