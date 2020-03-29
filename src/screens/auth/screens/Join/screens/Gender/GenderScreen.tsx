import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from 'library/components/Button'
import { Label } from 'library/components/Label'
import { Error } from 'screens/auth/components/Error'
import { SelectGender } from 'screens/auth/components/SelectGender'
import { FormLayout } from 'library/layouts/FormLayout'
import { JoinContext } from '../../Join.context'
import { AuthContext } from 'screens/auth/Auth.context'

export const GenderScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(JoinContext)
  const { setIsConnected } = useContext(AuthContext)

  const handleOnNext = () => {
    if (!values.gender) {
      return setHasError(true)
    }

    setIsConnected(true)
    return setHasError(false)
  }

  const handleOnChange = (value) => {
    if (value) {
      setHasError(false)
    }

    setValue('gender', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.goBack()}
      containerStyle={styles.formContainer}
      label={<Label primary={`Charlotte 👋`} secondary="Tu es..." />}
      error={
        <Error
          hideError={!hasError}
          primary="😘 Qui que tu sois, reste tel que tu es !"
          secondary="Aide : Choisi un genre pour continuer..."
        />
      }
      submit={
        <Button onAction={handleOnNext} leftIcon="check">
          Terminé
        </Button>
      }
    >
      <SelectGender value={values.gender} onChange={handleOnChange} />
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
})
