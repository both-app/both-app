import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Avatar } from 'library/components/Avatar'
import { Point } from 'library/components/Point'
import { Medal } from '../Medal'

interface UserRecapProps {
  avatarUrl?: string
  firstName: string
  isWinner: boolean
  taskName: string
  points: number
  isMe: boolean
}

export const UserRecap: FC<UserRecapProps> = ({
  avatarUrl,
  firstName,
  isWinner,
  points,
  taskName,
  isMe,
}) => {
  const { t } = useT()

  const userStyle = {
    ...styles.user,
    ...(isMe ? styles.me : {}),
  }

  const firstNameStyle = {
    ...styles.firstName,
    color: isMe ? colors.white : colors.dark200,
  }

  const specialityStyle = {
    opacity: isMe ? 1 : 0.75,
    color: isMe ? colors.white : colors.dark200,
  }

  return (
    <View style={userStyle}>
      <View style={styles.avatarContainer}>
        <Medal type={isWinner ? 'winner' : 'loser'} />
        <Avatar
          avatar={avatarUrl}
          firstname={firstName}
          size="small"
          borderWidth={1}
          borderColor={isMe ? 'highlight100' : 'white'}
        />
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={firstNameStyle}>
          {firstName} {isMe ? `(${t('me')})` : ''}
        </Text>
        <Text style={specialityStyle}>
          {t('app:screen:leaderboard:speciality', { taskName })}
        </Text>
      </View>

      <View style={styles.pointsContainer}>
        <Point points={points} shape={points > 9 ? 'rectangle' : 'circle'} />
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
  me: {
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
    marginLeft: 16,
  },
})
