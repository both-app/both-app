import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from 'library/components/Button'
import { Logo } from 'library/components/Logo'
import BarsIcon from '../../../../assets/bars.svg'

export const SelectScreen = () => {
  const navigation = useNavigation()

  const goTo = (screenName: string) => () => navigation.navigate(screenName)

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Button variation="primary" onAction={goTo('Create')}>
        Créer une relation
      </Button>
      <Button variation="dark" onAction={goTo('Join')} style={styles.margin}>
        Rejoindre une relation
      </Button>

      <BarsIcon width={200} />
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingRight: 20,
    paddingLeft: 20,
  },
  margin: {
    marginBottom: 20,
  },
})
