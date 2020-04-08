import React, { useContext } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { MinimalButton } from 'library/components/MinimalButton'
import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'
import { Relation, Value } from './components'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const SettingsScreen = () => {
  const { t, locale } = useT()
  const { me } = useContext(UsersContext)
  const navigation = useNavigation()

  const formattedBirthDate = new Date(me.birthDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  const formattedGender = {
    male: t('male'),
    female: t('female'),
    other: t('other'),
  }[me.gender]

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.close}>
        <MinimalButton
          iconName="chevron_left"
          iconColor="dark200"
          onAction={() => navigation.goBack()}
        />
      </View>

      <Label primary={t('app:screen:profil:settings:title')} />

      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <Relation />

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>
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

          <Text style={styles.title}>
            {t('app:screen:profil:settings:nightRead:title')}
          </Text>
          <CardButton
            emoji="🔐"
            title={t('app:screen:profil:settings:protectData:title')}
            subtitle={t('app:screen:profil:settings:protectData:subtitle')}
          />
          <CardButton
            emoji="📑"
            title={t('app:screen:profil:settings:cgu:title')}
            subtitle={t('app:screen:profil:settings:cgu:subtitle')}
          />
        </ScrollView>
      </SafeAreaView>
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
  scrollContainer: {
    flex: 1,
    paddingTop: 56,
    paddingLeft: 24,
    paddingRight: 24,
  },
  title: {
    color: colors.dark200,
    textTransform: 'uppercase',
    fontWeight: '500',
    paddingBottom: 8,
  },
})
