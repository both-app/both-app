import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

import { colors } from 'res/colors'

import { Header } from './components/Header'
import { TaskAddedModal } from './components/TaskAddedModal'
import { ShareRelationKeyModal } from './components/ShareRelationKeyModal'
import { UserTasks } from './components/UserTasks'
import { RelationStatus } from './components/RelationStatus'
import { RelationInfo } from './components/RelationInfo'
import { WeekInfo } from './components/WeekInfo'

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header>
        <WeekInfo />
        <RelationInfo />
        <RelationStatus />
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
