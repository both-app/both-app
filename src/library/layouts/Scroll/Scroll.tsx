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
}) => {
  const containerStyle = { ...styles.container, ...style }

  const topElementStyle = {
    height: 1,
    ...(marginTop ? { marginTop } : {}),
  }

  const bottomElementStyle = {
    height: 1,
    ...(marginBottom ? { marginBottom } : {}),
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={containerStyle}>
      <View style={topElementStyle} />
      {children}
      <View style={bottomElementStyle} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
