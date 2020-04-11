import React, { useContext, useCallback } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { colors } from 'res/colors'

import { Header } from './components/Header'
import { TaskAddedModal } from './components/TaskAddedModal'
import { ShareRelationKeyModal } from './components/ShareRelationKeyModal'
import { UserTasks } from './components/UserTasks'
import { RelationStatus } from './components/RelationStatus'
import { RelationInfo } from './components/RelationInfo'
import { WeekInfo } from './components/WeekInfo'
import { ShareRelationKey } from './components/ShareRelationKey'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const DashboardScreen = () => {
  const { partner } = useContext(UsersContext)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, [])
  )

  return (
    <View style={styles.container}>
      <Header>
        <WeekInfo />
        <RelationInfo />
        <RelationStatus />
      </Header>

      <View style={styles.bottomContainer}>
        <View style={styles.badgeContainer}>
          {!partner.id && <ShareRelationKey />}
        </View>

        <UserTasks />
      </View>

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
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.skin100,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})
