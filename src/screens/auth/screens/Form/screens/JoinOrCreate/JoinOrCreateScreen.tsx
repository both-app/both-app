import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'

import { Select } from 'screens/auth/components/Select'
import { FormContext } from '../../Form.context'

export const JoinOrCreateScreen = () => {
  const navigation = useNavigation()
  const { t } = useT()
  const { values, setValue } = useContext(FormContext)

  const handleOnChange = (value: 'JOIN' | 'CREATE') => {
    setValue('type', value)

    if (value === 'JOIN') {
      return navigation.navigate('Code')
    }

    return navigation.navigate('Gender')
  }

  return (
    <FormLayout
      onBackAction={() => navigation.goBack()}
      containerStyle={styles.formContainer}
      label={
        <Label
          primary={t('auth:screen:form:joinOrCreate:title')}
          secondary={t('auth:screen:form:joinOrCreate:subtitle')}
        />
      }
      bottomInfo={
        <View style={{ paddingHorizontal: 24 }}>
          <Info
            hide={false}
            color="dark100"
            primary={t('auth:screen:form:joinOrCreate:info:title')}
            secondary={t('auth:screen:form:joinOrCreate:info:subtitle')}
          />
        </View>
      }
    >
      <Select
        value={values.type}
        onChange={handleOnChange}
        options={[
          {
            emoji: '🔑',
            label: t('auth:screen:form:joinOrCreate:select:join:label'),
            extraInfo: t('auth:screen:form:joinOrCreate:select:join:subtitle'),
            value: 'JOIN',
          },
          {
            emoji: '🥇',
            label: t('auth:screen:form:joinOrCreate:select:create:label'),
            extraInfo: t(
              'auth:screen:form:joinOrCreate:select:create:subtitle'
            ),
            value: 'CREATE',
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
