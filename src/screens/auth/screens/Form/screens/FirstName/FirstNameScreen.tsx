import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'

import { Input } from 'screens/auth/components/Input'
import { AuthFormContext } from '../../../../AuthForm.context'

export const FirstNameScreen = () => {
  const navigation = useNavigation()
  const [error, setError] = useState<[string, string] | []>([])
  const { values, setValue } = useContext(AuthFormContext)

  const handleOnNext = () => {
    if (!values.firstName) {
      return setError([
        '🤔 Flemme de taper ton prénom ?',
        'Aide : Mets au moins tes initiales pour continuer...',
      ])
    }

    if (values.firstName.length < 2) {
      return setError([
        '😰 Soit plus précis',
        'Aide : Il faut au minimum 2 caractères, tu peux le faire...',
      ])
    }

    navigation.navigate('JoinOrCreate')
    return setError([])
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setError([])
    }

    setValue('firstName', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.navigate('Select')}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={<Label primary="Bonjour ☀️" secondary="Comment t'appelles-tu ?" />}
      bottomInfo={
        <Info
          hide={!error.length}
          withHapticFeedback
          color="danger"
          primary={error[0]}
          secondary={error[1]}
        />
      }
    >
      <Input placeholder="Ton prénom" onChangeText={handleOnChangeText} />
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
