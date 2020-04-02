import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'

import { Info } from 'library/components/Info'
import { CardButton } from 'library/components/CardButton'
import { Header, Week, Body } from './components/Header'
import { TaskAddedModalContainer } from './components/TaskAddedModal'
import { ShareRelationKeyModalContainer } from './components/ShareRelationKeyModal'

export const DashboardScreen = () => {
  const navigation = useNavigation()
  const [isFetchingList, setIsFetchingList] = useState(false)

  const handleOnRefresh = () => {
    setIsFetchingList(true)

    setTimeout(() => {
      setIsFetchingList(false)
    }, 5000)
  }

  return (
    <View style={styles.container}>
      <Header>
        <Week>Semaine 17 • Samedi 28 mars</Week>

        <Body
          leftUserName="Mathieu"
          rightUserName="Charlotte"
          leftPoints={105}
          rightPoints={10}
        />

        <Info
          color="white"
          primary="🏆 T’es premier au classement"
          secondary="Normal t’es seul… Relance ton acolyte !"
        />
      </Header>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingList}
            onRefresh={handleOnRefresh}
          />
        }
      >
        <CardButton
          emoji="➕"
          title="Ajouter une tâche"
          withHapticFeedback
          onAction={() => navigation.navigate('AddTask')}
        />
      </ScrollView>

      <ShareRelationKeyModalContainer />
      <TaskAddedModalContainer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark100,
    paddingTop: 65,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.skin100,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 13,
  },
  list: {
    flex: 1,
  },
})
