import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from 'library/components/Button'
import { Logo } from 'library/components/Logo'
import { colors } from 'res/colors'

export const SelectScreen = () => {
  const navigation = useNavigation()

  const goTo = (screenName: string) => () => navigation.navigate(screenName)

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.buttonsContainer}>
        <Button variation="primary" onAction={goTo('Join')}>
          Rejoindre un acolyte
        </Button>
        <Button marginTop={16} variation="secondary" onAction={goTo('Create')}>
          Créer une relation
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.beigeLight,
  },
  logoContainer: {
    marginTop: 244,
  },
  buttonsContainer: {
    marginBottom: 32,
    marginLeft: 24,
    marginRight: 24,
  },
})
