import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'
import { InputDate } from 'screens/auth/components/InputDate'
import { AuthFormContext } from '../../../../AuthForm.context'
import { isValidDate } from 'res/date'
import { useT } from 'res/i18n'

export const BirthDateScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()
  const [error, setError] = useState<[string, string] | []>([])
  const { values, setValue } = useContext(AuthFormContext)

  const handleOnNext = async () => {
    const dateParsed = values.birthDate.split('/')

    if (
      !values.birthDate ||
      !isValidDate(dateParsed[0], dateParsed[1], dateParsed[2])
    ) {
      return setError([
        t('auth:screen:form:birthDate:error:wrongDate:title'),
        t('auth:screen:form:birthDate:error:wrongDate:subtitle'),
      ])
    }

    return navigation.navigate('PushNotification')
  }

  const handleOnChangeText = (date: string) => {
    if (date) {
      setError([])
    }

    setValue('birthDate', date)
  }

  const handleOnBack = () => {
    setValue('gender', '')

    navigation.goBack()
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={
        <Label
          primary={t('auth:screen:form:birthDate:title')}
          secondary={t('auth:screen:form:birthDate:subtitle')}
        />
      }
      bottomInfo={
        <Info
          hide={!error.length}
          withHapticFeedback
          color="danger"
          primary={error[0]}
          secondary={error[1]}
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
