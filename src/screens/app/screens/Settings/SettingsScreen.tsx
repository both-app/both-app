import React, { useContext, useCallback } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as StoreReview from 'expo-store-review'
import { Asset } from 'expo-asset'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'
import { Scroll } from 'library/layouts/Scroll'

import { UsersContext } from 'screens/app/contexts/Users.context'

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { AuthContext, AuthApiContext } from 'screens/auth/contexts'
import { Value } from './components'

export const SettingsScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()
  const { me, partner } = useContext(UsersContext)
  const { logout } = useContext(AuthContext)
  const { deleteRelation } = useContext(AuthApiContext)

  useFocusEffect(
    useCallback(() => {
      loadTeamAvatars()
    }, [])
  )

  const formattedGender = {
    male: t('male'),
    female: t('female'),
    other: t('other'),
  }[me.gender]

  const loadTeamAvatars = async () => {
    const images = [
      require('../../../../../assets/team/mathieu.png'),
      require('../../../../../assets/team/gauthier.png'),
      require('../../../../../assets/team/vincent.png'),
    ]

    await Promise.all(
      images.map((image) => Asset.fromModule(image).downloadAsync())
    )
  }

  const goToPrivacyPolicy = async () => {
    await WebBrowser.openBrowserAsync('https://appboth.com/privacy-policy')
  }

  const goToTermsAndConditions = async () => {
    await WebBrowser.openBrowserAsync(
      'https://appboth.com/terms-and-conditions'
    )
  }

  const goToTheTeam = () => {
    navigation.navigate('TheTeam')
  }

  const handleFeedback = async () => {
    await WebBrowser.openBrowserAsync('https://forms.gle/vFxTrrKXZNstFsz17')
  }

  const handleRateApp = () => StoreReview.requestReview()

  const handleEndRelation = () => {
    Alert.alert(
      t('alert:endRelation:title'),
      t('alert:endRelation:description'),
      [
        {
          text: t('alert:endRelation:noButton'),
          style: 'cancel',
        },
        {
          text: t('alert:endRelation:yesButton'),
          style: 'destructive',
          onPress: () => {
            deleteRelation()
            logout(true)
          },
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Label primary={t('app:screen:settings:title')} />

      <Scroll style={styles.scrollContainer} marginTop={24} marginBottom={24}>
        <Value
          label={t('app:screen:profil:firstName')}
          value={me.firstName}
          marginBottom={16}
        />
        <Value
          label={t('app:screen:profil:gender')}
          value={formattedGender}
          marginBottom={16}
        />

        <CardButton
          emoji="💔"
          title={t('app:screen:settings:button:endRelation:title')}
          subtitle={
            partner.id
              ? t(
                  'app:screen:settings:button:endRelation:subtitle:withPartner',
                  {
                    firstName: partner.firstName,
                  }
                )
              : t(
                  'app:screen:settings:button:endRelation:subtitle:withoutPartner'
                )
          }
          onAction={handleEndRelation}
          containerStyle={styles.button}
        />

        <Text style={styles.sectionTitle}>
          {t('app:screen:settings:section:together')}
        </Text>
        <CardButton
          emoji="💡"
          title={t('app:screen:settings:button:shareIdeas:title')}
          subtitle={t('app:screen:settings:button:shareIdeas:subtitle')}
          onAction={handleFeedback}
          containerStyle={styles.button}
        />
        <CardButton
          emoji="⭐️"
          title={t('app:screen:settings:button:voteTheApp:title')}
          subtitle={t('app:screen:settings:button:voteTheApp:subtitle')}
          onAction={handleRateApp}
          containerStyle={styles.button}
        />

        <Text style={styles.sectionTitle}>
          {t('app:screen:settings:section:aboutBoth')}
        </Text>
        <CardButton
          emoji="👨‍👦‍👦"
          title={t('app:screen:settings:button:theTeam:title')}
          subtitle={t('app:screen:settings:button:theTeam:subtitle')}
          onAction={goToTheTeam}
          containerStyle={styles.button}
        />
        <CardButton
          emoji="🔐"
          title={t('app:screen:settings:button:protectData:title')}
          subtitle={t('app:screen:settings:button:protectData:subtitle')}
          onAction={goToPrivacyPolicy}
          containerStyle={styles.button}
        />
        <CardButton
          emoji="📑"
          title={t('app:screen:settings:button:cgu:title')}
          subtitle={t('app:screen:settings:button:cgu:subtitle')}
          onAction={goToTermsAndConditions}
          containerStyle={styles.button}
        />
      </Scroll>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: colors.skin100,
  },
  close: {
    marginRight: 'auto',
    paddingLeft: 24,
  },
  scrollContainer: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
  },
  sectionTitle: {
    color: colors.dark200,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    marginBottom: 8,
  },
})
