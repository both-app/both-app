import React, { useContext } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'

import { Info } from 'library/components/Info'
import { CardButton } from 'library/components/CardButton'
import { AuthContext } from 'screens/auth'
import { Avatar } from 'library/components/Avatar'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { RelationContext } from 'screens/app/contexts/Relation.context'
import { useT } from 'res/i18n'

export const ProfilScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()
  const { logout } = useContext(AuthContext)
  const { me } = useContext(UsersContext)
  const { daysOfRelation } = useContext(RelationContext)

  const handleFeedback = async () => {
    await WebBrowser.openBrowserAsync('https://payfit.com')
  }

  const handleRateApp = async () => {
    await WebBrowser.openBrowserAsync('https://payfit.com')
  }

  const handleEndRelation = () => {
    Alert.alert(t('alert:endRelation:title'), '', [
      {
        text: t('alert:endRelation:noButton'),
        style: 'cancel',
      },
      {
        text: t('alert:endRelation:yesButton'),
        style: 'destructive',
        onPress: logout,
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Avatar
        size="medium"
        backgroundColor="dark200"
        firstname={me.firstName}
        avatarColor="white"
      />

      <Text style={styles.firstname}>{me.firstName}</Text>

      <Info
        color="dark200"
        primary={t('app:screen:profil:numberOfRelationDays', {
          count: daysOfRelation,
          days: daysOfRelation,
        })}
        secondary={t('app:screen:profil:thankToUseBoth')}
      />

      <View style={styles.links}>
        <CardButton
          emoji="⚙️"
          title={t('app:screen:profil:button:settings:title')}
          subtitle={t('app:screen:profil:button:settings:subtitle')}
          onAction={() => navigation.navigate('Settings')}
          withHapticFeedback
        />
        <CardButton
          emoji="💔"
          title={t('app:screen:profil:button:endRelation:title')}
          subtitle={t('app:screen:profil:button:endRelation:subtitle')}
          onAction={handleEndRelation}
          withHapticFeedback
        />
        <CardButton
          emoji="👪"
          title={t('app:screen:profil:button:theTeam:title')}
          subtitle={t('app:screen:profil:button:theTeam:subtitle')}
          onAction={() => navigation.navigate('TheTeam')}
          withHapticFeedback
        />
        <CardButton
          emoji="💡"
          title={t('app:screen:profil:button:shareIdeas:title')}
          subtitle={t('app:screen:profil:button:shareIdeas:subtitle')}
          onAction={handleFeedback}
          withHapticFeedback
        />
        <CardButton
          emoji="⭐️"
          title={t('app:screen:profil:button:voteTheApp:title')}
          subtitle={t('app:screen:profil:button:voteTheApp:subtitle')}
          onAction={handleRateApp}
          withHapticFeedback
        />
      </View>
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
  firstname: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.dark200,
    marginTop: 16,
    marginBottom: 24,
  },
  links: {
    width: '100%',
    marginTop: 72,
  },
})
