import React, { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

interface ScrollProps {
  style?: any
  marginTop?: number
  marginBottom?: number
}

export const Scroll: FC<ScrollProps> = ({
  children,
  style = {},
  marginBottom,
  marginTop,
}) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ ...styles.container, ...style }}
  >
    <View style={{ height: 1, ...(marginTop ? { marginTop } : {}) }} />

    {children}

    <View style={{ height: 1, ...(marginBottom ? { marginBottom } : {}) }} />
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
