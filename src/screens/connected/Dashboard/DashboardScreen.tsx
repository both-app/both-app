import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export const DashboardScreen = () => (
  <View style={styles.container}>
    <Text>Dashboard</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
