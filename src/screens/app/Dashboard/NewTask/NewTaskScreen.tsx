import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export const NewTaskScreen = () => (
  <View style={styles.container}>
    <Text>New Task</Text>
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
