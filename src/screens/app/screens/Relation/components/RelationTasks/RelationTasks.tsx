import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

import { SegmentedControl } from 'library/components/SegmentedControl'
import { Scroll } from 'library/layouts/Scroll'

import { RelationTask } from '../RelationTask/RelationTask'

export const RelationTasks = () => {
  return (
    <View style={styles.container}>
      <SegmentedControl
        values={['Mes tâches (0)', 'Mes demandes (1)']}
        selectedIndex={0}
        onTabPress={console.log}
        activeTabBackgroundColor="white"
        backgroundColor="rgba(118,118,128,0.24)"
        textColor="dark200"
      />

      <Scroll marginBottom={24} marginTop={8}>
        <RelationTask
          isDone={true}
          emoji="🎂"
          title="Indiquer la date d'anniv de couple"
          subtitle="Tape ici pour envoyer une invit"
        />
      </Scroll>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
