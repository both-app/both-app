import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

import { Avatar } from 'library/components/Avatar'
import { Medal } from '../Medal'

export const UserRecapPlaceholder: FC = () => {
  return (
    <View style={styles.user}>
      <View style={styles.avatarContainer}>
        <Medal type="loser" />
        <Avatar
          firstname="⌛️"
          size="small"
          borderWidth={1}
          borderColor="white"
        />
      </View>

      <View style={styles.userInfoContainer}>
        <View
          style={{
            width: 70,
            height: 15,
            ...styles.placeholder,
          }}
        />
        <View
          style={{
            width: 140,
            height: 15,
            marginTop: 8,
            ...styles.placeholder,
          }}
        />
      </View>

      <View style={styles.pointsContainer}>
        <View
          style={{
            width: 60,
            height: 40,
            ...styles.placeholder,
          }}
        />
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  user: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.skin200,
    paddingTop: 27,
    paddingRight: 16,
    paddingBottom: 27,
    paddingLeft: 31,
    borderRadius: 8,
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  pointsContainer: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  placeholder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 24.6,
  },
})
