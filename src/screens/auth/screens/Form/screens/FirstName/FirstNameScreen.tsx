import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'

import { Input } from 'screens/auth/components/Input'
import { FormContext } from '../../Form.context'

export const FirstNameScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()
  const [error, setError] = useState<[string, string] | []>([])
  const { values, setValue } = useContext(FormContext)

  const handleOnNext = () => {
    if (!values.firstName) {
      return setError([
        t('auth:screen:form:firstName:error:empty:title'),
        t('auth:screen:form:firstName:error:empty:subtitle'),
      ])
    }

    if (values.firstName.length < 2) {
      return setError([
        t('auth:screen:form:firstName:error:minimumCharacters:title'),
        t('auth:screen:form:firstName:error:minimumCharacters:subtitle'),
      ])
    }

    navigation.navigate('JoinOrCreate')
    return setError([])
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setError([])
    }

    setValue('firstName', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.navigate('Select')}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      testID="firstNameForm"
      label={
        <Label
          primary={t('auth:screen:form:firstName:title')}
          secondary={t('auth:screen:form:firstName:subtitle')}
        />
      }
      bottomInfo={
        <Info
          hide={!error.length}
          withHapticFeedback
          color="critical"
          primary={error[0]}
          secondary={error[1]}
        />
      }
    >
      <View style={styles.inputContainer}>
        <Input
          placeholder={t('auth:screen:form:firstName:input')}
          onChangeText={handleOnChangeText}
        />
      </View>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 52,
  },
})
