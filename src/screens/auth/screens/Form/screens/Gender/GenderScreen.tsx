import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'

import { Label } from 'library/components/Label'
import { Select } from 'screens/auth/components/Select'
import { FormLayout } from 'library/layouts/FormLayout'

import { FormContext } from '../../Form.context'

export const GenderScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()
  const { values, setValue } = useContext(FormContext)

  const handleOnChange = (value: 'female' | 'male' | 'other') => {
    setValue('gender', value)

    return navigation.navigate('PushNotification')
  }

  const handleOnBack = () => {
    setValue('type', '')

    navigation.goBack()
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      containerStyle={styles.formContainer}
      label={
        <Label
          primary={`${values.firstName} 👋`}
          secondary={t('auth:screen:form:gender:subtitle')}
        />
      }
    >
      <Select
        value={values.gender}
        onChange={handleOnChange}
        options={[
          {
            emoji: '👩',
            label: t('auth:screen:form:gender:select:woman:label'),
            value: 'female',
          },
          {
            emoji: '🧔',
            label: t('auth:screen:form:gender:select:male:label'),
            value: 'male',
          },
          {
            emoji: '💖',
            label: t('auth:screen:form:gender:select:other:label'),
            value: 'other',
          },
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
