import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Avatar } from 'library/components/Avatar'
import { Point } from 'library/components/Point'
import { Medal } from '../Medal'

interface UserProps {
  firstName: string
  isWinner: boolean
  taskName: string
  points: number
}

export const User: FC<UserProps> = ({
  firstName,
  isWinner,
  points,
  taskName,
}) => {
  const { t } = useT()

  const userStyle = {
    ...styles.user,
    ...(isWinner ? styles.winnerUser : {}),
  }

  const firstNameStyle = {
    ...styles.firstName,
    color: isWinner ? colors.white : colors.dark200,
  }

  const specialityStyle = {
    opacity: isWinner ? 1 : 0.75,
    color: isWinner ? colors.white : colors.dark200,
  }

  return (
    <View style={userStyle}>
      <View style={styles.avatarContainer}>
        <Medal type={isWinner ? 'winner' : 'loser'} />
        <Avatar
          firstname={firstName}
          size="small"
          borderWidth={1}
          borderColor={isWinner ? 'highlight100' : 'white'}
        />
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={firstNameStyle}>{firstName}</Text>
        <Text style={specialityStyle}>
          {t('app:screen:leaderboard:speciality', { taskName })}
        </Text>
      </View>

      <View style={styles.pointsContainer}>
        <Point
          points={points}
          shape="rectangle"
          backgroundColor={isWinner ? 'highlight200' : 'skin200'}
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
  winnerUser: {
    backgroundColor: colors.highlight200,
    borderWidth: 2,
    borderColor: colors.highlight100,
  },
  avatarContainer: {
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  firstName: {
    fontWeight: '500',
    marginBottom: 2,
  },
  pointsContainer: {
    justifyContent: 'center',
  },
})
