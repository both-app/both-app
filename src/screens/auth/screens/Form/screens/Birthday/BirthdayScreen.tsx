import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'
import { InputDate } from 'screens/auth/components/InputDate'
import { AuthContext } from 'screens/auth/Auth.context'
import { AuthFormContext } from '../../../../AuthForm.context'
import { isValidDate } from 'res/date'

export const BirthdayScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(AuthFormContext)
  const { setIsConnected } = useContext(AuthContext)

  const handleOnFinish = () => {
    const dateParsed = values.birthday.split('/').map(Number)

    if (
      !values.birthday ||
      !isValidDate(dateParsed[0], dateParsed[1], dateParsed[2])
    ) {
      return setHasError(true)
    }

    setIsConnected(true)
    return setHasError(false)
  }

  const handleOnChangeText = (date: string) => {
    if (date) {
      setHasError(false)
    }

    setValue('birthday', date)
  }

  const handleOnBack = () => {
    setValue('gender', '')

    navigation.goBack()
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      onFinishAction={handleOnFinish}
      containerStyle={styles.formContainer}
      label={<Label primary="Et enfin 🎁" secondary="Ton anniversaire..." />}
      bottomInfo={
        <Info
          hide={!hasError}
          withHapticFeedback
          color="danger"
          primary="🙄 Es-tu certain de ta date d’anniversaire ?"
          secondary="Aide : Fais un effort ou bien demande à ta maman…"
        />
      }
    >
      <InputDate onChange={handleOnChangeText} />
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
