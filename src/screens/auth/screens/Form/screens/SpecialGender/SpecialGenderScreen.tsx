import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'

import { Input } from 'screens/auth/components/Input'
import { AuthFormContext } from '../../../../AuthForm.context'

export const SpecialGenderScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(AuthFormContext)

  const handleOnNext = () => {
    if (!values.specialGender) {
      return setHasError(true)
    }

    navigation.navigate('Birthday')
    return setHasError(false)
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setHasError(false)
    }

    setValue('specialGender', value)
  }

  const handleOnBack = () => {
    setValue('specialGender', '')
    setValue('gender', '')

    navigation.navigate('Gender')
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={<Label primary="010101" secondary="010101" />}
      bottomInfo={
        <Info
          hide={!hasError}
          withHapticFeedback
          color="danger"
          primary="🤔 Flemme de taper ton prénom ?"
          secondary="Aide : Mets au moins tes initiales pour continuer…"
        />
      }
    >
      <Input placeholder="Dit nous" onChangeText={handleOnChangeText} />
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
