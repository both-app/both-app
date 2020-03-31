import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { Select } from 'screens/auth/components/Select'
import { FormLayout } from 'library/layouts/FormLayout'
import { CreateContext } from '../../Create.context'

export const GenderScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(CreateContext)

  const handleOnNext = () => {
    if (!values.gender) {
      return setHasError(true)
    }

    navigation.navigate('BirthdayDate')
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
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={<Label primary={`${values.name} 👋`} secondary="Tu es..." />}
      bottomInfo={
        <Info
          hide={!hasError}
          withVibration
          color="danger"
          primary="😘 Qui que tu sois, reste tel que tu es !"
          secondary="Aide : Choisi un genre pour continuer..."
        />
      }
    >
      <Select
        value={values.gender}
        onChange={handleOnChange}
        options={[
          { emoji: '👩', label: 'Je suis une femme', value: 'woman' },
          { emoji: '🧔', label: 'Je suis un homme', value: 'man' },
          { emoji: '💖', label: 'Je me définis autrement', value: 'other' },
        ]}
      />
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
})
