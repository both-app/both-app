import React, { useContext, useCallback } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'
import { useT } from 'res/i18n'

import { Info } from 'library/components/Info'
import { Scroll } from 'library/layouts/Scroll'
import { Avatar } from 'library/components/Avatar'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { RelationContext } from 'screens/app/contexts/Relation.context'
import { Relation } from './components'
import { Label } from 'library/components/Label'

export const RelationScreen = () => {
  const { t } = useT()
  const { me } = useContext(UsersContext)
  const { daysOfRelation } = useContext(RelationContext)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  return (
    <View style={styles.container}>
      <Label primary="La relation" />

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
