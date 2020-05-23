import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'
import { getExpoPushToken } from 'res/notification'

import { Label } from 'library/components/Label'
import { FormLayout } from 'library/layouts/FormLayout'
import { Info } from 'library/components/Info'

import { AuthContext, AuthApiContext } from 'screens/auth/contexts'
import { Select } from 'screens/auth/components/Select'

import { FormContext } from '../../Form.context'

export const PushNotificationScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()

  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [error, setError] = useState<[string, string] | []>([])

  const { values } = useContext(FormContext)
  const { createRelation, joinRelation } = useContext(AuthApiContext)
  const { login } = useContext(AuthContext)

  const handleOnFinish = async (value: 'yes' | 'no') => {
    if (isSelected) {
      return
    }

    setIsSelected(true)

    const pushToken = value === 'yes' ? await getExpoPushToken() : ''

    if (values.type === 'CREATE') {
      return createRelationAndLogin(pushToken)
    }

    return joinRelationAndLogin(pushToken)
  }

  const createRelationAndLogin = async (pushToken: string) => {
    const result = await createRelation({
      firstName: values.firstName,
      gender: values.gender,
      avatarPath: values.avatarPath,
      ...(pushToken ? { pushToken } : {}),
    })

    login(result.data.data)
  }

  const joinRelationAndLogin = async (pushToken: string) => {
    try {
      const result = await joinRelation({
        firstName: values.firstName,
        gender: values.gender,
        code: values.code,
        avatarPath: values.avatarPath,
        ...(pushToken ? { pushToken } : {}),
      })

      login(result.data.data)
    } catch (e) {
      setError([
        t('auth:screen:form:pushNotification:error:wrongCode:title'),
        t('auth:screen:form:pushNotification:error:wrongCode:subtitle'),
      ])
    }
  }

  const handleOnBack = () => navigation.goBack()

  return (
    <FormLayout
      onBackAction={handleOnBack}
      containerStyle={styles.formContainer}
      label={
        <Label
          primary={t('auth:screen:form:pushNotification:title')}
          secondary={t('auth:screen:form:pushNotification:subtitle')}
        />
      }
      bottomInfo={
        <View style={{ paddingHorizontal: 24 }}>
          {error.length > 0 ? (
            <Info
              withHapticFeedback
              color="critical"
              primary={error[0]}
              secondary={error[1]}
            />
          ) : (
            <Info
              color="dark100"
              secondary={t(
                'auth:screen:form:pushNotification:info:cgu:subtitle'
              )}
            />
          )}
        </View>
      }
    >
      <Select
        onChange={handleOnFinish}
        options={[
          {
            emoji: '✅',
            label: t('auth:screen:form:pushNotification:select:yes:label'),
            extraInfo: t(
              'auth:screen:form:pushNotification:select:yes:subtitle'
            ),
            value: 'yes',
          },
          {
            emoji: '✖️',
            label: t('auth:screen:form:pushNotification:select:no:label'),
            extraInfo: t(
              'auth:screen:form:pushNotification:select:no:subtitle'
            ),
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
