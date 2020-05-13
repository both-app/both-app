import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'

import { Input } from 'screens/auth/components/Input'
import { Info } from 'library/components/Info'

export const ChooseNameScreen = () => {
  const navigation = useNavigation()
  const [taskName, setTaskName] = useState<string>()
  const [error, setError] = useState<[string, string] | []>([])

  const handleOnNext = () => {
    if (!taskName) {
      return setError(['Oups', 'Me faut un nom'])
    }

    navigation.navigate('ChooseEmoji', { taskName })
    return setError([])
  }

  const handleOnChangeText = async (value: string) => {
    if (value) {
      setError([])
    }

    setTaskName(value)
  }

  const handleOnClose = () => {
    navigation.navigate('Home')
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onCloseAction={handleOnClose}
      onNextAction={handleOnNext}
      label={
        <Label primary="Nouvelle tâche 🌱" secondary="Donne lui un nom..." />
      }
      bottomInfo={
        <Info
          hide={!error.length}
          withHapticFeedback
          color="critical"
          primary={error[0]}
          secondary={error[1]}
        />
      }
    >
      <View style={styles.inputContainer}>
        <Input
          placeholder="Nom de la tâche"
          onChangeText={handleOnChangeText}
        />
      </View>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 52,
  },
})
