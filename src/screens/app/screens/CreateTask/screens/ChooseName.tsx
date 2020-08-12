import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core'

import { useT } from 'res/i18n'
import { useStatusBar } from 'hooks/useStatusBar'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'

import { Input } from 'screens/auth/components/Input'
import { CreateTaskStackParamList, ROUTES } from '../CreateTask.navigator'

type ChooseNameRouteProps = RouteProp<CreateTaskStackParamList, 'ChooseName'>

export const ChooseNameScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const navigation = useNavigation()
  const route = useRoute<ChooseNameRouteProps>()
  const [taskName, setTaskName] = useState<string>()
  const [error, setError] = useState<[string, string] | []>([])

  const { category } = route.params

  const handleOnNext = () => {
    if (!taskName) {
      return setError([
        t('app:screen:createTask:chooseName:error:missing:title'),
        t('app:screen:createTask:chooseName:error:missing:subtitle'),
      ])
    }

    navigation.navigate(ROUTES.CHOOSE_EMOJI, {
      category,
      taskName,
    })

    return setError([])
  }

  const handleOnChangeText = async (value: string) => {
    if (value) {
      setError([])
    }

    setTaskName(value)
  }

  const handleOnBack = () => {
    return navigation.goBack()
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      onNextAction={handleOnNext}
      label={
        <Label
          primary={t('app:screen:createTask:chooseName:title')}
          secondary={t('app:screen:createTask:chooseName:subtitle')}
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
          placeholder={t('app:screen:createTask:chooseName:input:placeholder')}
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
