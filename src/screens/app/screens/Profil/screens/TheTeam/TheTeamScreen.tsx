import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'

import { MinimalButton } from 'library/components/MinimalButton'
import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Member } from './components/Member'
import { useT } from 'res/i18n'

export const TheTeamScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()

  const handleOnAction = async (linkedinUrl: string) => {
    await WebBrowser.openBrowserAsync(linkedinUrl)
  }

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

      <Label primary="Le trio derrière Both" />

      <View style={styles.teamInfo}>
        <Info
          color="dark200"
          primary={t('app:screen:profil:theTeam:title')}
          secondary={t('app:screen:profil:theTeam:subtitle')}
        />
      </View>

      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Member
            firsName="Mathieu"
            emoji="🐸"
            post={t('app:screen:profil:theTeam:developer')}
            avatarUrl={require('../../../../../../../assets/team/mathieu.png')}
            relationStatus={t('app:screen:profil:theTeam:search')}
            onAction={() =>
              handleOnAction(
                'https://www.linkedin.com/in/mathieu-le-tyrant-a2438880'
              )
            }
          />
          <Member
            firsName="Vincent"
            emoji="🤖"
            post={t('app:screen:profil:theTeam:developer')}
            avatarUrl={require('../../../../../../../assets/team/vincent.png')}
            relationStatus={t('app:screen:profil:theTeam:search')}
            onAction={() =>
              handleOnAction('https://www.linkedin.com/in/vincentdufrasnes')
            }
          />
          <Member
            firsName="Gauthier"
            emoji="🛠"
            post={t('app:screen:profil:theTeam:designer')}
            avatarUrl={require('../../../../../../../assets/team/gauthier.png')}
            relationStatus={t('app:screen:profil:theTeam:inRelationSince')}
            onAction={() =>
              handleOnAction(
                'https://www.linkedin.com/in/gauthier-casanova-a979085a/'
              )
            }
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
  },
  teamInfo: {
    marginTop: 64,
  },
})
