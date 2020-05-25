import React from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { useStatusBar } from 'hooks/useStatusBar'

import { Label } from 'library/components/Label'

import { Relation } from './components'

export const RelationScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()

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
