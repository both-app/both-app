import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'
import { getExpoPushToken } from 'res/notification'

import { Label } from 'library/components/Label'
import { Select } from 'screens/auth/components/Select'
import { FormLayout } from 'library/layouts/FormLayout'
import { Info } from 'library/components/Info'

import { AuthFormContext } from '../../../../AuthForm.context'
import { AuthApiContext } from 'screens/auth/AuthApi.context'
import { AuthContext } from 'screens/auth/Auth.context'

export const PushNotificationScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()
  const [error, setError] = useState<[string, string] | []>([])
  const { values, setValue } = useContext(AuthFormContext)
  const { createRelation, joinRelation } = useContext(AuthApiContext)
  const { login } = useContext(AuthContext)

  const handleOnFinish = async (value: 'yes' | 'no') => {
    if (value === 'yes') {
      const token = await getExpoPushToken()
      setValue('expoPushToken', token)
    }

    if (values.type === 'CREATE') {
      return createRelationAndLogin()
    }

    return joinRelationAndLogin()
  }

  const createRelationAndLogin = async () => {
    const result = await createRelation({
      firstName: values.firstName,
      birthDate: new Date(values.birthDate).getTime(),
      gender: values.gender,
      expoPushToken: values.expoPushToken,
    })

    login(result.data.data)
  }

  const joinRelationAndLogin = async () => {
    try {
      const result = await joinRelation({
        firstName: values.firstName,
        birthDate: new Date(values.birthDate).getTime(),
        gender: values.gender,
        code: values.code,
        expoPushToken: values.expoPushToken,
      })

      login(result.data.data)
    } catch (e) {
      setError([
        t('auth:screen:form:pushNotification:error:wrongCode:title'),
        t('auth:screen:form:pushNotification:error:wrongCode:subtitle'),
      ])
    }
  }

  const handleOnBack = () => {
    setValue('expoPushToken', '')

    navigation.goBack()
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      containerStyle={styles.formContainer}
      label={
        <Label primary="Et pour finir" secondary="Parlons notifications" />
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
      <Select
        value={values.expoPushToken}
        onChange={handleOnFinish}
        options={[
          {
            emoji: '🔥',
            label: 'Oui, je suis chaud',
            extraInfo: 'Promis on ne flood pas',
            value: 'yes',
          },
          {
            emoji: '⛔️',
            label: 'Non, pas besoin',
            extraInfo: 'blabla',
            value: 'no',
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
