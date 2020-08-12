import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useT } from 'res/i18n'
import { deleteFromPath } from 'res/image'
import { useStatusBar } from 'hooks/useStatusBar'

import { Layout } from 'library/layouts/Layout'
import { IconButton } from 'library/components/IconButton'
import { Label } from 'library/components/Label'
import { Scroll } from 'library/layouts/Scroll'
import { Info } from 'library/components/Info'

import { UserAvatar } from 'screens/components/UserAvatar'
import { SecurityBlock } from './components/SecurityBlock'
import { UserInfo } from './components/UserInfo'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const ProfilScreen = () => {
  useStatusBar('light-content')
  const { t } = useT()
  const navigation = useNavigation()
  const { me, updateUser } = useContext(UsersContext)

  const handleAvatarUploaded = async (path: string) => {
    const avatarPath = me.avatarPath

    await updateUser({ avatarPath: path })
    await deleteFromPath(avatarPath)
  }

  return (
    <Layout
      header={
        <View style={styles.header}>
          <Label primary={t('app:screen:profil:pageTitle')} color="white" />
        </View>
      }
      centerTopPosition={-60}
      center={
        <UserAvatar
          firstName={me.firstName}
          avatarUrl={me.avatarUrl}
          onAvatarUploaded={handleAvatarUploaded}
        />
      }
    >
      <View style={styles.container}>
        <Scroll style={styles.scrollContainer} marginTop={32} marginBottom={32}>
          <Info
            primary={t('app:screen:profil:title', { firstName: me.firstName })}
            secondary={t('app:screen:profil:subtitle')}
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
