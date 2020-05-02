import React, { useContext } from 'react'
import { View, StyleSheet, Platform, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'
import { getDateFnsLocale } from 'res/date'

import { MinimalButton } from 'library/components/MinimalButton'
import { Label } from 'library/components/Label'

import { Value } from './components'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const ProfilScreen = () => {
  const { t, locale } = useT()
  const navigation = useNavigation()
  const { me } = useContext(UsersContext)

  const formattedBirthDate = format(new Date(me.birthDate), 'P', {
    locale: getDateFnsLocale(locale),
    weekStartsOn: 1,
  })

  const formattedGender = {
    male: t('male'),
    female: t('female'),
    other: t('other'),
  }[me.gender]

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={styles.close}>
          <MinimalButton
            iconName="chevron_left"
            iconColor="dark200"
            onAction={() => navigation.goBack()}
          />
        </View>
      )}

      <Label primary={t('app:screen:theTeam:pageTitle')} />

      <Text>{t('app:screen:profil:settings:infoPerso:title')}</Text>

      <Value
        label={t('app:screen:profil:settings:firstName')}
        value={me.firstName}
        marginBottom={16}
      />
      <Value
        label={t('app:screen:profil:settings:birthDate')}
        value={formattedBirthDate}
        marginBottom={16}
      />
      <Value
        label={t('app:screen:profil:settings:gender')}
        value={formattedGender}
        marginBottom={32}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 55,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.skin100,
  },
  close: {
    marginRight: 'auto',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 45,
  },
  teamInfo: {
    marginTop: 40,
  },
})
