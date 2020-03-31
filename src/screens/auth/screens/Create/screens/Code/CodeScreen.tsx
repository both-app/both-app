import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Info } from 'library/components/Info'
import { Label } from 'library/components/Label'
import { InputCode } from 'screens/auth/components/InputCode'
import { FormLayout } from 'library/layouts/FormLayout'
import { CreateContext } from '../../Create.context'

const CODE_LENGTH = 6

export const CodeScreen = () => {
  const navigation = useNavigation()
  const [hasError, setHasError] = useState(false)
  const { values, setValue } = useContext(CreateContext)

  const handleOnNext = () => {
    if (!values.code || values.code.length < CODE_LENGTH) {
      return setHasError(true)
    }

    navigation.navigate('Gender')
    return setHasError(false)
  }

  const handleOnChangeText = (value) => {
    if (value) {
      setHasError(false)
    }

    setValue('code', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.navigate('DoYouHaveCode')}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={<Label primary="Bonjour ☀️" secondary="Saisis ton code..." />}
      bottomInfo={
        <Info
          hide={!hasError}
          color="pink"
          primary="😥 Code invalide !"
          secondary="Aide : Vérifie bien le code que ton acolyte t'as donné..."
        />
      }
    >
      <InputCode
        value={values.code}
        placeholder="537207"
        length={CODE_LENGTH}
        onChange={handleOnChangeText}
      />
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
