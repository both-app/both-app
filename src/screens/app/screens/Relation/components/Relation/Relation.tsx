import React, { useContext, FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'
import { useT } from 'res/i18n'

import { Avatar } from 'library/components/Avatar'
import { RelationContext } from 'screens/app/contexts/Relation.context'
import { UsersContext } from 'screens/app/contexts/Users.context'

const Avatars: FC<{ me: User; partner: User }> = ({ me, partner }) => (
  <View style={styles.avatarsContainer}>
    <Avatar
      avatar={me.avatarUrl}
      firstname={me.firstName}
      size="small"
      borderColor="skin200"
    />
    <Avatar
      avatar={partner.avatarUrl}
      firstname={partner.firstName || '⌛️'}
      size="small"
      borderColor="skin200"
      containerStyle={{ marginLeft: -10 }}
    />
  </View>
)

export const Relation = () => {
  const { t } = useT()
  const { me, partner } = useContext(UsersContext)
  const { daysOfRelation } = useContext(RelationContext)

  return (
    <>
      <View style={styles.relationInfoContainer}>
        <Avatars me={me} partner={partner} />

        <View style={{ marginLeft: 8 }}>
          <Text style={styles.name}>
            {me.firstName} + {partner.firstName || '💖'}
          </Text>
          <Text style={styles.relationDuration}>
            {t('app:screen:relation:onBothSince', {
              count: daysOfRelation,
              daysOfRelation,
            })}
          </Text>
        </View>
      </View>
    </>
  )
}

export const styles = StyleSheet.create({
  relationInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.skin200,
    borderRadius: 8,
    paddingTop: 24,
    paddingBottom: 22,
    paddingLeft: 16,
  },
  avatarsContainer: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark200,
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
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
