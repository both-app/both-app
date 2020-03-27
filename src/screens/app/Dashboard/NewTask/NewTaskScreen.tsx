import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Input } from 'library/components/Input'
import { Dropdown } from 'library/components/Dropdown'
import { Button } from 'library/components/Button'

export const NewTaskScreen = () => {
  return (
    <View style={styles.container}>
      <Input
        label="Nom de la tâche"
        placeholder="Entrez un nom pour cette tâche"
        onEndEditing={console.log}
      />
      <Dropdown
        label="Thématique"
        placeholder="Choissiez une thématique"
        items={[
          { label: 'Cuisine', value: 'c' },
          { label: 'Animaux', value: 'a' },
        ]}
      />

      <View style={styles.buttonContainer}>
        <Button variation="dark">Ajouter la tâche</Button>
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
    paddingTop: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
})
