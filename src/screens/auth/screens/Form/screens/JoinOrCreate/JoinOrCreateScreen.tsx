import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'

import { Select } from 'screens/auth/components/Select'
import { AuthFormContext } from '../../../../AuthForm.context'

export const JoinOrCreateScreen = () => {
  const navigation = useNavigation()
  const { values, setValue } = useContext(AuthFormContext)

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
      label={<Label primary="Enchanté 🙂" secondary="As tu une clé ?" />}
      bottomInfo={
        <Info
          hide={false}
          color="dark100"
          primary="💡Une clé te permet de rejoindre une relation !"
          secondary="Aide : Ton acolyte doit t’inviter en t’envoyer la clé de votre relation, un code unique comportant 6 caractères."
        />
      }
    >
      <Select
        value={values.type}
        onChange={handleOnChange}
        options={[
          {
            emoji: '🔑',
            label: 'Oui, je suis invité par un acolyte',
            extraInfo: 'Rejoindre une relation existante',
            value: 'JOIN',
          },
          {
            emoji: '🥇',
            label: 'Non, je suis le premier sur Both',
            extraInfo: 'Créer une nouvelle relation',
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
