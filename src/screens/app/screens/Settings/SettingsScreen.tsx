import React, { useContext, useCallback } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as StoreReview from 'expo-store-review'
import { Asset } from 'expo-asset'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'
import { useStatusBar } from 'hooks/useStatusBar'

import { Label } from 'library/components/Label'
import { CardButton } from 'library/components/CardButton'
import { Scroll } from 'library/layouts/Scroll'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { AuthContext, AuthApiContext } from 'screens/auth/contexts'

export const SettingsScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const navigation = useNavigation()
  const { partner } = useContext(UsersContext)
  const { logout } = useContext(AuthContext)
  const { deleteRelation } = useContext(AuthApiContext)

  useFocusEffect(
    useCallback(() => {
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

      loadTeamAvatars()
    }, [])
  )

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
        <Text style={styles.sectionTitle}>
          {t('app:screen:settings:section:yourSettings')}
        </Text>
        <CardButton
          emoji="🙈"
          title={t('app:screen:settings:button:profil:title')}
          subtitle={t('app:screen:settings:button:profil:subtitle')}
          onAction={() => navigation.navigate('Profil')}
          containerStyle={styles.button}
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
          emoji="🧸"
          title={t('app:screen:settings:button:joinBothClub:title')}
          subtitle={t('app:screen:settings:button:joinBothClub:subtitle')}
          onAction={() =>
            WebBrowser.openBrowserAsync('https://bit.ly/JoinBothClub')
          }
          containerStyle={styles.button}
        />
        <CardButton
          emoji="💡"
          title={t('app:screen:settings:button:shareIdeas:title')}
          subtitle={t('app:screen:settings:button:shareIdeas:subtitle')}
          onAction={() =>
            WebBrowser.openBrowserAsync('https://forms.gle/vFxTrrKXZNstFsz17')
          }
          containerStyle={styles.button}
        />
        <CardButton
          emoji="⭐️"
          title={t('app:screen:settings:button:voteTheApp:title')}
          subtitle={t('app:screen:settings:button:voteTheApp:subtitle')}
          onAction={() => StoreReview.requestReview()}
          containerStyle={styles.button}
        />

        <Text style={styles.sectionTitle}>
          {t('app:screen:settings:section:aboutBoth')}
        </Text>
        <CardButton
          emoji="👨‍👦‍👦"
          title={t('app:screen:settings:button:theTeam:title')}
          subtitle={t('app:screen:settings:button:theTeam:subtitle')}
          onAction={() => navigation.navigate('TheTeam')}
          containerStyle={styles.button}
        />
        <CardButton
          emoji="🔐"
          title={t('app:screen:settings:button:protectData:title')}
          subtitle={t('app:screen:settings:button:protectData:subtitle')}
          onAction={() =>
            WebBrowser.openBrowserAsync('https://appboth.com/privacy-policy')
          }
          containerStyle={styles.button}
        />
        <CardButton
          emoji="📑"
          title={t('app:screen:settings:button:cgu:title')}
          subtitle={t('app:screen:settings:button:cgu:subtitle')}
          onAction={() =>
            WebBrowser.openBrowserAsync(
              'https://appboth.com/terms-and-conditions'
            )
          }
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
