import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'

import { Input } from 'screens/auth/components/Input'
import { CreateContext } from '../../Create.context'

export const NameScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(CreateContext)

  const handleOnNext = () => {
    if (!values.name) {
      return setHasError(true)
    }

    navigation.navigate('DoYouHaveCode')
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
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={<Label primary="Bonjour ☀️" secondary="Comment t'appelles-tu ?" />}
      bottomInfo={
        <Info
          hide={!hasError}
          color="danger"
          primary="🤔 Flemme de taper ton prénom ?"
          secondary="Aide : Mets au moins tes initiales pour continuer…"
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
