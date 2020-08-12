import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

import { Badge } from 'library/components/Badge'
import { Scroll } from 'library/layouts/Scroll'

import { RelationTask } from '../RelationTask/RelationTask'

export const RelationTasks = () => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Badge color="warning" size="s">
          Tâches à réaliser
        </Badge>

        <Text style={styles.remainingTasks}>2 tâches restantes</Text>
      </View>

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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remainingTasks: {
    color: colors.dark200,
    opacity: 0.75,
  },
})
