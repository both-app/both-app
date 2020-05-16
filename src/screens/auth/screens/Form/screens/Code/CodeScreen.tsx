import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'

import { Info } from 'library/components/Info'
import { Label } from 'library/components/Label'
import { InputCode } from 'screens/auth/components/InputCode'
import { FormLayout } from 'library/layouts/FormLayout'
import { FormContext } from '../../Form.context'

const CODE_LENGTH = 6

export const CodeScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()
  const [error, setError] = useState<[string, string] | []>([])
  const { values, setValue } = useContext(FormContext)

  const handleOnNext = () => {
    if (!values.code || values.code.length < CODE_LENGTH) {
      return setError([
        t('auth:screen:form:code:error:wrongCode:title'),
        t('auth:screen:form:code:error:wrongCode:subtitle'),
      ])
    }

    navigation.navigate('Gender')
    return setError([])
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setError([])
    }

    setValue('code', value)
  }

  const handleOnBack = () => {
    setValue('code', '')
    setValue('type', '')

    navigation.goBack()
  }

  return (
    <FormLayout
      onBackAction={handleOnBack}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={
        <Label
          primary={t('auth:screen:form:code:title')}
          secondary={t('auth:screen:form:code:subtitle')}
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
      <View style={styles.codeContainer}>
        <InputCode
          value={values.code}
          placeholder="------"
          length={CODE_LENGTH}
          onChange={handleOnChangeText}
        />
      </View>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  codeContainer: {
    marginTop: 52,
  },
})
