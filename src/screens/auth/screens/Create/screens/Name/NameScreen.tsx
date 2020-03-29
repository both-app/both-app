import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from 'library/components/Button'
import { Label } from 'screens/auth/components/Label'
import { Error } from 'screens/auth/components/Error'
import { Input } from 'screens/auth/components/Input'
import { FormLayout } from 'library/layouts/FormLayout'
import { CreateContext } from '../../Create.context'

export const NameScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(CreateContext)

  const handleOnNext = () => {
    if (!values.name) {
      return setHasError(true)
    }

    navigation.navigate('Gender')
    return setHasError(false)
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setHasError(false)
    }

    setValue('name', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.navigate('Select')}
      containerStyle={styles.formContainer}
      label={<Label primary="Bonjour ☀️" secondary="Comment t'appelles-tu ?" />}
      error={
        <Error
          hideError={!hasError}
          primary="🤔 Flemme de taper ton prénom ?"
          secondary="Aide : Mets au moins tes initiales pour continuer…"
        />
      }
      submit={
        <Button onAction={handleOnNext} leftIcon="arrow_right_circle">
          Continuer
        </Button>
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
