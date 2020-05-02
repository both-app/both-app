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
      <Avatar
        size="medium"
        backgroundColor="dark200"
        firstname={me.firstName}
        avatarColor="white"
      />

      <Text style={styles.firstname}>{me.firstName}</Text>

      {daysOfRelation && (
        <Info
          color="dark200"
          primary={t('app:screen:profil:numberOfRelationDays', {
            count: daysOfRelation,
            days: daysOfRelation,
          })}
          secondary={t('app:screen:profil:thankToUseBoth')}
        />
      )}

      <Scroll style={styles.links}>
        <Relation />
      </Scroll>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 55,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.skin100,
  },
  firstname: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.dark200,
    textTransform: 'capitalize',
    marginTop: 16,
    marginBottom: 24,
  },
  links: {
    flex: 1,
    width: '100%',
    marginTop: 45,
  },
  button: {
    marginTop: 8,
  },
})
