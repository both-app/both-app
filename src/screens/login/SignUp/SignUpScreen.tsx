import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Button } from '../../../library/components/Button'
import { Section } from '../../../library/components/Section'
import { Input } from '../../../library/components/Input'

export const SignUpScreen = () => (
  <View style={styles.container}>
    <Section name="Moi" style={styles.section} />
    <Input
      label="Prénom"
      placeholder="Entrez votre prénom"
      onEndEditing={console.log}
    />
    <Input
      label="Email"
      placeholder="Entrez votre email"
      keyboardType="email-address"
      onEndEditing={console.log}
    />
    <Input
      label="Mot de passe"
      placeholder="Entrez un mot de passe"
      keyboardType="default"
      isTheLast
      onEndEditing={console.log}
    />

    <Section name="Mon partenaire" style={styles.section} />
    <Input
      label="Email"
      placeholder="Entrez l'email de votre partenaire"
      keyboardType="email-address"
      onEndEditing={console.log}
    />

    <View style={styles.buttonContainer}>
      <Button variation="dark">Créer une room</Button>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
})
