import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Info } from 'library/components/Info'
import { Label } from 'library/components/Label'
import { InputCode } from 'screens/auth/components/InputCode'
import { FormLayout } from 'library/layouts/FormLayout'
import { AuthFormContext } from '../../../../AuthForm.context'

const CODE_LENGTH = 6

export const CodeScreen = () => {
  const navigation = useNavigation()
  const [error, setError] = useState<[string, string] | []>([])
  const { values, setValue } = useContext(AuthFormContext)

  const handleOnNext = () => {
    if (!values.code || values.code.length < CODE_LENGTH) {
      return setError([
        '😥 Code invalide !',
        "Aide : Vérifie bien le code que ton acolyte t'a donné...",
      ])
    }

    navigation.navigate('Gender')
    return setError([])
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setError([])
    }

    setValue('code', value)
  }

  const handleOnBack = () => {
    setValue('code', '')
    setValue('type', '')

    navigation.goBack()
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={
        <Label primary="Ton acolyte t’attend 🥰" secondary="Tape ta clé…" />
      }
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
      <InputCode
        value={values.code}
        placeholder="------"
        length={CODE_LENGTH}
        onChange={handleOnChangeText}
      />
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
