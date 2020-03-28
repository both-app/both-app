import React, { useContext, useState, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from 'library/components/Button'
import { Label } from 'screens/auth/components/Label'
import { Error } from 'screens/auth/components/Error'
import { InputCode } from 'screens/auth/components/InputCode'
import { ScreenContainer } from 'screens/auth/components/ScreenContainer'
import { FormContainer } from 'screens/auth/components/FormContainer'
import { JoinContext } from '../../Join.context'

const CODE_LENGTH = 6

export const CodeScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(JoinContext)

  const handleOnNext = () => {
    if (!values.code || values.code.length < CODE_LENGTH) {
      return setHasError(true)
    }

    navigation.navigate('Gender')
    return setHasError(false)
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setHasError(false)
    }

    setValue('code', value)
  }

  return (
    <ScreenContainer onBackAction={() => navigation.navigate('Select')}>
      <FormContainer
        containerStyle={styles.formContainer}
        label={<Label primary="Bonjour ☀️" secondary="Saisis ton code..." />}
        field={
          <InputCode
            value={values.code}
            placeholder="537207"
            length={CODE_LENGTH}
            onChange={handleOnChangeText}
          />
        }
        error={
          <Error
            hideError={!hasError}
            primary="😥 Code invalide !"
            secondary="Aide : Vérifie bien le code que ton acolyte t'as donné..."
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
