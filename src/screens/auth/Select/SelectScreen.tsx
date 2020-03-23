import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../../../library/components/Button'

export const SelectScreen = () => {
  const navigation = useNavigation()

  const goTo = (screenName: string) => () => navigation.navigate(screenName)

  return (
    <View style={styles.container}>
      <Button variation="primary" onAction={goTo('SignUp')}>
        S'inscrire
      </Button>
      <Button variation="dark" onAction={goTo('Join')}>
        Rejoindre une relation
      </Button>
      <Button variation="light" onAction={goTo('SignIn')}>
        Se connecter
      </Button>
    </View>
  )
}

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
