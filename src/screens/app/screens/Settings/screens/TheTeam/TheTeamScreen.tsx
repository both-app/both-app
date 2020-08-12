import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'
import { useStatusBar } from 'hooks/useStatusBar'

import { MinimalButton } from 'library/components/MinimalButton'
import { Label } from 'library/components/Label'
import { Info } from 'library/components/Info'
import { Scroll } from 'library/layouts/Scroll'

import { Member } from './components/Member'

export const TheTeamScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const navigation = useNavigation()

  const handleOnAction = async (linkedinUrl: string) => {
    await WebBrowser.openBrowserAsync(linkedinUrl)
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

      <Label primary={t('app:screen:theTeam:pageTitle')} />

      <View style={styles.teamInfo}>
        <Info
          color="dark200"
          primary={t('app:screen:theTeam:title')}
          secondary={t('app:screen:theTeam:subtitle')}
        />
      </View>

      <Scroll style={styles.scrollContainer} marginTop={45} marginBottom={24}>
        <Member
          firsName="Mathieu"
          emoji="🐸"
          post={t('app:screen:theTeam:developer')}
          avatar={require('../../../../../../../assets/team/mathieu.png')}
          relationStatus={t('app:screen:theTeam:search')}
          onAction={() =>
            handleOnAction(
              'https://www.linkedin.com/in/mathieu-le-tyrant-a2438880'
            )
          }
        />
        <Member
          firsName="Vincent"
          emoji="🤖"
          post={t('app:screen:theTeam:developer')}
          avatar={require('../../../../../../../assets/team/vincent.png')}
          relationStatus={t('app:screen:theTeam:search')}
          onAction={() =>
            handleOnAction('https://www.linkedin.com/in/vincentdufrasnes')
          }
        />
        <Member
          firsName="Gauthier"
          emoji="🦊"
          post={t('app:screen:theTeam:designer')}
          avatar={require('../../../../../../../assets/team/gauthier.png')}
          relationStatus={t('app:screen:theTeam:inRelationSince')}
          onAction={() =>
            handleOnAction(
              'https://www.linkedin.com/in/gauthier-casanova-a979085a/'
            )
          }
        />
      </Scroll>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.skin100,
  },
  close: {
    marginRight: 'auto',
    marginBottom: 24,
  },
  scrollContainer: {
    flex: 1,
  },
  teamInfo: {
    marginTop: 40,
  },
})
