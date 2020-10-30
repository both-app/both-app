import React, { useCallback, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { useStatusBar } from 'hooks/useStatusBar'

import { Label } from 'library/components/Label'

import { Relation } from './components/Relation'
import { RelationTasks } from './components/RelationTasks'
import { AppNavigatorContext } from 'screens/app/contexts/AppNavigator.context'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const RelationScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const { unSetRouteBadge } = useContext(AppNavigatorContext)
  const { partner } = useContext(UsersContext)

  const hasPartner = !!partner.id

  useFocusEffect(
    useCallback(() => {
      unSetRouteBadge('Relation')
    }, [])
  )

  return (
    <View style={styles.container}>
      <Label primary={t('app:screen:relation:pageTitle')} />

      <View style={styles.relationContainer}>
        <Relation />
      </View>

      {hasPartner && (
        <>
          <View style={styles.separator} />

          <View style={styles.relationTasksContainer}>
            <RelationTasks />
          </View>
        </>
      )}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: colors.skin100,
  },
  separator: {
    height: 1,
    backgroundColor: colors.skin200,
  },
  relationContainer: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  relationTasksContainer: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },
})
