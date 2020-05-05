import React, { FC } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

interface ScrollProps {
  style: any
}

export const Scroll: FC<ScrollProps> = ({ children, style }) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ ...styles.container, ...style }}
  >
    {children}
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
})
