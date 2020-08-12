import React, { useContext, useLayoutEffect, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { useStatusBar } from 'hooks/useStatusBar'

import { Label } from 'library/components/Label'

import { Relation } from './components/Relation'
import { RelationTasks } from './components/RelationTasks'
import { AppNavigatorContext } from 'screens/app/contexts/AppNavigator.context'
import { useNavigation } from '@react-navigation/native'

export const RelationScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const { unSetRouteBadge } = useContext(AppNavigatorContext)

  useEffect(() => {
    unSetRouteBadge('Relation')
  }, [])

  return (
    <View style={styles.container}>
      <Label primary={t('app:screen:relation:pageTitle')} />

      <View style={styles.relationContainer}>
        <Relation />
      </View>

      <View style={styles.relationTasksContainer}>
        <RelationTasks />
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.skin100,
  },
  relationContainer: {
    marginTop: 24,
    marginBottom: 30,
  },
  relationTasksContainer: {
    flex: 1,
    marginTop: 40,
  },
})
