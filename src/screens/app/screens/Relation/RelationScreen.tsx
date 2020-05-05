import React, { useCallback } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Relation } from './components'
import { Label } from 'library/components/Label'

export const RelationScreen = () => {
  const { t } = useT()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  return (
    <View style={styles.container}>
      <Label primary={t('app:screen:relation:pageTitle')} />

      <View style={styles.relationContainer}>
        <Relation />
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
  },
})
