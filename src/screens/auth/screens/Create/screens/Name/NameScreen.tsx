import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from 'library/components/Button'
import { Label } from 'screens/auth/components/Label'
import { Error } from 'screens/auth/components/Error'
import { Input } from 'screens/auth/components/Input'
import { ScreenContainer } from 'screens/auth/components/ScreenContainer'
import { FormContainer } from 'screens/auth/components/FormContainer'
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
    <ScreenContainer onBackAction={() => navigation.navigate('Select')}>
      <FormContainer
        containerStyle={styles.formContainer}
        label={
          <Label primary="Bonjour ☀️" secondary="Comment t'appelles-tu ?" />
        }
        field={
          <Input placeholder="Ton prénom" onChangeText={handleOnChangeText} />
        }
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
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
