import React from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  SectionList,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from 'res/colors'
import { Info } from 'library/components/Info'
import { Header, Week, Counter } from './components/Header'
import { Task } from './components/Task'
import { Section } from './components/Section'
import { TaskAddedModalContainer } from './components/TaskAddedModal'
import { ShareRelationKeyModalContainer } from './components/ShareRelationKeyModal'
import { CardButton } from 'library/components/CardButton'

const DATA = []

export const DashboardScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Header>
        <Week>Semaine 17 • Samedi 28 mars</Week>

        <Counter
          leftUserName="Mathieu"
          rightUserName="Charlotte"
          leftPoints={7}
          rightPoints={0}
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
      >
        <CardButton
          emoji="➕"
          title="Ajouter une tâche"
          onAction={() => navigation.navigate('AddTask')}
        />

        <SafeAreaView style={styles.list}>
          <SectionList
            sections={DATA}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item }) => <Task {...item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Section title={title} />
            )}
          />
        </SafeAreaView>
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
