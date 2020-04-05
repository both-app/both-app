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
import { AuthApiContext } from 'screens/auth/AuthApi.context'

export const BirthDateScreen = () => {
  const navigation = useNavigation()
  const [error, setError] = useState<[string, string] | []>([])

  const { values, setValue } = useContext(AuthFormContext)
  const { createRelation, joinRelation } = useContext(AuthApiContext)
  const { login } = useContext(AuthContext)

  const handleOnFinish = async () => {
    const dateParsed = values.birthDate.split('/').map(Number)

    if (
      !values.birthDate ||
      !isValidDate(dateParsed[0], dateParsed[1], dateParsed[2])
    ) {
      return setError([
        '🙄 Es-tu certain de ta date d’anniversaire ?',
        'Aide : Fais un effort ou bien demande à ta maman...',
      ])
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
      })

      login(result.data.data)
    } catch (e) {
      setError([
        '😥 Code invalide !',
        "Aide : Vérifie bien le code que ton acolyte t'a donné...",
      ])
    }
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
      onFinishAction={handleOnFinish}
      containerStyle={styles.formContainer}
      label={<Label primary="Et enfin 🎁" secondary="Ton anniversaire..." />}
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
