import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Select } from 'screens/auth/components/Select'
import { FormLayout } from 'library/layouts/FormLayout'
import { AuthFormContext } from '../../../../AuthForm.context'

export const GenderScreen = () => {
  const navigation = useNavigation()
  const { values, setValue } = useContext(AuthFormContext)

  const handleOnChange = (value: 'woman' | 'man' | 'other') => {
    setValue('gender', value)

    if (value === 'other') {
      return navigation.navigate('SpecialGender')
    }

    return navigation.navigate('Birthday')
  }

  const handleOnBack = () => {
    setValue('type', '')

    navigation.goBack()
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      containerStyle={styles.formContainer}
      label={<Label primary={`${values.name} 👋`} secondary="Tu es..." />}
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
