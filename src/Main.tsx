import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from './library/components/Button'

export const Main = () => (
  <View style={styles.container}>
    <Button variation="primary">S'inscrire</Button>
    <Button variation="dark">Rejoindre une relation</Button>
    <Button variation="light">Se connecter</Button>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingRight: 20,
    paddingLeft: 20,
  },
})
