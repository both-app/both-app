import React, { useContext } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser'
import format from 'date-fns/format'

import { getDateFnsLocale } from 'res/date'
import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { MinimalButton } from 'library/components/MinimalButton'
import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'
import { Scroll } from 'library/layouts/Scroll'

import { UsersContext } from 'screens/app/contexts/Users.context'

import { Relation, Value } from './components'

export const SettingsScreen = () => {
  const { t, locale } = useT()
  const { me } = useContext(UsersContext)
  const navigation = useNavigation()

  const formattedBirthDate = format(new Date(me.birthDate), 'P', {
    locale: getDateFnsLocale(locale),
  })

  const formattedGender = {
    male: t('male'),
    female: t('female'),
    other: t('other'),
  }[me.gender]

  const goToPrivacyPolicy = async () => {
    await WebBrowser.openBrowserAsync('https://appboth.com/privacy-policy')
  }

  const goToTermsAndConditions = async () => {
    await WebBrowser.openBrowserAsync(
      'https://appboth.com/terms-and-conditions'
    )
  }

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

      <Label primary={t('app:screen:profil:settings:title')} />

      <View style={styles.relationcontainer}>
        <Relation />
      </View>

      <Scroll style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>
          {t('app:screen:profil:settings:infoPerso:title')}
        </Text>

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

        <Text style={styles.sectionTitle}>
          {t('app:screen:profil:settings:nightRead:title')}
        </Text>
        <CardButton
          emoji="🔐"
          title={t('app:screen:profil:settings:protectData:title')}
          subtitle={t('app:screen:profil:settings:protectData:subtitle')}
          onAction={goToPrivacyPolicy}
        />
        <CardButton
          emoji="📑"
          title={t('app:screen:profil:settings:cgu:title')}
          subtitle={t('app:screen:profil:settings:cgu:subtitle')}
          onAction={goToTermsAndConditions}
        />
      </Scroll>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 55,
    backgroundColor: colors.skin100,
  },
  close: {
    marginRight: 'auto',
    paddingLeft: 24,
  },
  relationcontainer: {
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
    marginTop: 56,
    paddingLeft: 24,
    paddingRight: 24,
  },
  sectionTitle: {
    color: colors.dark200,
    textTransform: 'uppercase',
    fontWeight: '500',
    paddingBottom: 8,
  },
})
