import React, { useContext } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'

import { Info } from 'library/components/Info'
import { Header, Week, Body } from './components/Header'
import { TaskAddedModal } from './components/TaskAddedModal'
import { ShareRelationKeyModal } from './components/ShareRelationKeyModal'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { RelationContext } from 'screens/app/contexts/Relation.context'

import { UserTasks } from './components/UserTasks'

export const DashboardScreen = () => {
  const navigation = useNavigation()
  const { me } = useContext(UsersContext)
  const { setShareKeyModal } = useContext(RelationContext)

  const goToTheProfilPage = () => navigation.navigate('Profil')

  const openShareKeyModal = () => setShareKeyModal(true)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header>
        <Week />

        <Body
          leftUserName={me.firstName}
          rightUserName="Charlotte"
          leftPoints={0}
          rightPoints={0}
          onLeftAction={goToTheProfilPage}
          onRightAction={openShareKeyModal}
        />

        <Info
          color="white"
          primary="🏆 T’es premier au classement"
          secondary="Normal t’es seul… Relance ton acolyte !"
        />
      </Header>

      <UserTasks />

      <ShareRelationKeyModal />
      <TaskAddedModal />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark100,
    paddingTop: 65,
  },
})
