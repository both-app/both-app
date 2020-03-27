import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { Button } from '../../../library/components/Button'
import { Section } from '../../../library/components/Section'
import { Input } from '../../../library/components/Input'
import { Dropdown } from '../../../library/components/Dropdown'
import { AuthContext } from '../Auth.context'

export const CreateScreen = () => {
  const { setIsConnected } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Section name="Moi" style={styles.section} />
      <Input
        label="Prénom"
        placeholder="Entrez votre prénom"
        onEndEditing={console.log}
      />
      <Dropdown
        label="Sexe"
        placeholder="Choissiez votre sexe"
        items={[
          { label: 'Homme', value: 'h' },
          { label: 'Femme', value: 'f' },
          { label: 'Non binaire', value: 'nb' },
        ]}
      />

      <View style={styles.buttonContainer}>
        <Button variation="dark" onAction={() => setIsConnected(true)}>
          Créer la relation
        </Button>
      </View>
    </View>
  )
}

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
