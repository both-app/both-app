import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'

import { Layout } from 'library/layouts/Layout'
import { IconButton } from 'library/components/IconButton'
import { Label } from 'library/components/Label'
import { Scroll } from 'library/layouts/Scroll'
import { Info } from 'library/components/Info'

import { UserAvatar } from './components/UserAvatar'
import { SecurityBlock } from './components/SecurityBlock'
import { UserInfo } from './components/UserInfo'

export const ProfilScreen = () => {
  const { t } = useT()
  const navigation = useNavigation()

  return (
    <Layout
      header={
        <View style={styles.header}>
          <Label primary="Infos. personnelles" color="white" />
        </View>
      }
      centerTopPosition={-60}
      center={<UserAvatar />}
    >
      <View style={styles.container}>
        <Scroll style={styles.scrollContainer} marginTop={32} marginBottom={32}>
          <Info
            primary="👋 Salut Mathieu"
            secondary="Ici tu peux ajouter une photo en guise d’avatar ou bien voir les informations personnelles te concernant"
            color="dark200"
          />

          <SecurityBlock />
          <UserInfo />
        </Scroll>

        <View style={styles.bottomContainer}>
          <IconButton
            iconName="arrow_left"
            onAction={() => navigation.goBack()}
            iconColor="white"
            buttonColor="dark200"
            size={64}
          />
        </View>
      </View>
    </Layout>
  )
}

export const styles = StyleSheet.create({
  header: {
    marginBottom: 74,
  },
  container: {
    flex: 1,
    marginTop: 60,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  bottomContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})
