import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'
import { useT } from 'res/i18n'

import { Avatar } from 'library/components/Avatar'
import { RelationContext } from 'screens/app/contexts/Relation.context'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const Relation = () => {
  const { t } = useT()
  const { me, partner } = useContext(UsersContext)
  const { relation, daysOfRelation } = useContext(RelationContext)

  return (
    <View style={styles.paddingContainer}>
      <View style={styles.relationContainer}>
        <View style={styles.avatars}>
          <Avatar firstname={me.firstName} size="small" borderColor="skin200" />
          <Avatar
            firstname={partner.firstName || '⌛️'}
            size="small"
            borderColor="skin200"
            containerStyle={{ marginLeft: -10 }}
          />
        </View>

        <Text style={styles.name}>
          {me.firstName} + {partner.firstName || '💖'}
        </Text>
        <Text style={styles.relationDuration}>
          {t('app:screen:profil:settings:onBothSince', {
            count: daysOfRelation,
            daysOfRelation,
          })}
        </Text>

        <View style={styles.codePosition}>
          <View style={styles.codeContainer}>
            <Text style={styles.relationKey}>
              {t('app:screen:profil:settings:keyOfTheRelation')}
            </Text>
            <Text style={styles.code}>{relation.code.split('').join(' ')}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  paddingContainer: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  relationContainer: {
    backgroundColor: colors.skin200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 48,
    marginTop: 64,
    position: 'relative',
  },
  avatars: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  name: {
    fontWeight: '500',
  },
  relationDuration: {
    color: colors.dark200,
    opacity: 0.75,
  },
  codePosition: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -30,
    left: 0,
    right: 0,
  },
  codeContainer: {
    backgroundColor: colors.dark200,
    borderRadius: 24.6,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: 'center',
  },
  relationKey: {
    color: colors.white,
  },
  code: {
    color: colors.white,
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
  },
})
