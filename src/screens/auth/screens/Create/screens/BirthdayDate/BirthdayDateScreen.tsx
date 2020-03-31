import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { Input } from 'screens/auth/components/Input'
import { FormLayout } from 'library/layouts/FormLayout'
import { CreateContext } from '../../Create.context'
import { AuthContext } from 'screens/auth/Auth.context'

export const BirthdayDateScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(CreateContext)
  const { setIsConnected } = useContext(AuthContext)

  const handleOnFinish = () => {
    if (!values.birthdayDate) {
      return setHasError(true)
    }

    setIsConnected(true)
    return setHasError(false)
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setHasError(false)
    }

    setValue('birthdayDate', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.goBack()}
      onFinishAction={handleOnFinish}
      containerStyle={styles.formContainer}
      label={<Label primary="Et enfin 🎁" secondary="Ton anniversaire..." />}
      bottomInfo={
        <Info
          hide={!hasError}
          color="danger"
          primary="🙄 Es-tu certain de ta date d’anniversaire ?"
          secondary="Aide : Fais un effort ou bien demande à ta maman…"
        />
      }
    >
      <Input placeholder="Ton age" onChangeText={handleOnChangeText} />
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
