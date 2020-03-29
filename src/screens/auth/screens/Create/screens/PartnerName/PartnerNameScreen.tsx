import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from 'library/components/Button'
import { Label } from 'library/components/Label'
import { Error } from 'screens/auth/components/Error'
import { Input } from 'screens/auth/components/Input'
import { FormLayout } from 'library/layouts/FormLayout'
import { CreateContext } from '../../Create.context'
import { AuthContext } from 'screens/auth/Auth.context'

export const PartnerNameScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(CreateContext)
  const { setIsConnected } = useContext(AuthContext)

  const handleOnNext = () => {
    if (!values.partnerName) {
      return setHasError(true)
    }

    setIsConnected(true)
    return setHasError(false)
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setHasError(false)
    }

    setValue('partnerName', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.goBack()}
      containerStyle={styles.formContainer}
      label={
        <Label primary="You rock 🤟" secondary="Et qui est ton acolyte ?" />
      }
      error={
        <Error
          hideError={!hasError}
          primary="🤭 Oula, tu ne connais pas son prénom ?"
          secondary="Aide : Fais un effort ou bien trouve toi un acolyte..."
        />
      }
      submit={
        <Button onAction={handleOnNext} leftIcon="check">
          Terminer
        </Button>
      }
    >
      <Input placeholder="Son prénom" onChangeText={handleOnChangeText} />
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
