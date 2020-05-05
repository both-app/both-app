import React, { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

interface ScrollProps {
  style: any
}

export const Scroll: FC<ScrollProps> = ({ children, style }) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ ...styles.container, ...style }}
  >
    {children}

    <View style={styles.listBottom} />
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listBottom: {
    marginBottom: 24,
  },
})
