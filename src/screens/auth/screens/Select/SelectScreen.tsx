import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'

import { Logo } from 'library/components/Logo'
import { Label } from 'library/components/Label'

export const SelectScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.bottom}>
        <Label primary="Bienvenue sur Both 👋" secondary="Commençons..." />

        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => navigation.navigate('Create')}
          activeOpacity={1}
        >
          <Text style={styles.putYourName}>Tape ton prénom</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueDark,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    backgroundColor: colors.beigeLight,
    paddingTop: 32,
    paddingBottom: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 48,
  },
  putYourName: {
    fontSize: 28,
    color: 'rgba(12,35,51,0.25)',
  },
})
