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
import { Header, Week, Counter, Info } from './components/Header'
import { ButtonAddTask } from './components/ButtonAddTask'
import { Task } from './components/Task'
import { Section } from './components/Section'

const DATA = [
  {
    title: 'Samedi 28 mars',
    data: [
      {
        color: colors.pinkDark,
        icon: '🧺',
        title: 'Étendre le linge',
        author: 'Mathieu',
        points: 2,
      },
      {
        color: colors.yellow,
        icon: '🛍',
        title: 'Faire les courses',
        author: 'Mathieu',
        points: 2,
      },
      {
        color: colors.blueLight,
        icon: '🐶',
        title: 'Sortir le chien',
        author: 'Mathieu',
        points: 3,
      },
    ],
  },
  {
    title: 'Vendredi 27 mars',
    data: [
      {
        color: colors.yellow,
        icon: '🛍',
        title: 'Faire les courses',
        author: 'Mathieu',
        points: 2,
      },
      {
        color: colors.blueLight,
        icon: '🐶',
        title: 'Sortir le chien',
        author: 'Mathieu',
        points: 3,
      },
    ],
  },
  {
    title: 'Jeudi 27 mars',
    data: [
      {
        color: colors.purple,
        icon: '💞',
        title: 'Créer la relation Both',
        author: 'Mathieu',
        points: 2,
      },
    ],
  },
]

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
          primary="🏆 T’es premier au classement"
          secondary="Normal t’es seul… Relance ton acolyte !"
        />
      </Header>

      <ScrollView style={styles.listContainer}>
        <ButtonAddTask onPress={() => navigation.navigate('AddTask')} />

        <SafeAreaView style={styles.list}>
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Task {...item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Section title={title} />
            )}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueDark,
    position: 'relative',
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.beigeLight,
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
