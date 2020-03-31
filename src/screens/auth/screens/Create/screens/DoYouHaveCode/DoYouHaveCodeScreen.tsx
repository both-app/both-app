import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { FormLayout } from 'library/layouts/FormLayout'

import { Select } from 'screens/auth/components/Select'
import { CreateContext } from '../../Create.context'

export const DoYouHaveCodeScreen = () => {
  const navigation = useNavigation()
  const { values, setValue } = useContext(CreateContext)

  const handleOnNext = () => {
    if (values.type === 'JOIN') {
      return navigation.navigate('Code')
    } else if (values.type === 'CREATE') {
      return navigation.navigate('Gender')
    }
  }

  const handleOnChange = (value) => {
    setValue('type', value)
  }

  return (
    <FormLayout
      onBackAction={() => navigation.goBack()}
      onNextAction={handleOnNext}
      containerStyle={styles.formContainer}
      label={<Label primary="Enchanté 🙂" secondary="As tu une clé ?" />}
      bottomInfo={
        <Info
          hide={false}
          color="blueDark"
          primary="💡Une clé te permet de rejoindre une relation !"
          secondary="Aide : Ton acolyte doit t’inviter en t’envoyer un code."
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
