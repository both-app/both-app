import React, { FC, useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { Color } from 'res/colors'

import { Badge } from 'library/components/Badge'
import { Info } from 'library/components/Info'
import { Modal } from 'library/components/Modal'
import { Avatar } from 'library/components/Avatar'
import { Medal } from '../Medal'
import { Counter } from './Counter'
import {
  UserScoreContext,
  ScoreSatus,
} from 'screens/app/contexts/UserScore.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { useT } from 'res/i18n'

enum Rank {
  Draw = 'draw',
  Winner = 'winner',
  Loser = 'loser',
}

export const WeekModal = () => {
  const { lastWeek, shoulDisplayWeeklyRecap, closeWeeklyRecap } = useContext(
    UserScoreContext
  )
  const { me, partner } = useContext(UsersContext)
  const { t } = useT()

  let userRank: Rank, partnerRank: Rank
  if (lastWeek.status === ScoreSatus.Draw) {
    userRank = Rank.Draw
    partnerRank = Rank.Draw
  } else if (lastWeek.status === ScoreSatus.UserWins) {
    userRank = Rank.Winner
    partnerRank = Rank.Loser
  } else {
    userRank = Rank.Loser
    partnerRank = Rank.Winner
  }

  const emoji = {
    winner: '🏆',
    loser: '💩',
    draw: '🏆',
  }[userRank]

  const badgeTitle = {
    winner: "C'est gagné 🥳",
    loser: "C'est perdu 😓",
    draw: '',
  }[userRank]

  const badgeColor = {
    winner: 'success',
    loser: 'critical',
    draw: '',
  }[userRank] as Color

  const infoPrimary = {
    winner: t(`app:relationStatus:winner:title:${me.gender}`),
    loser: t('app:relationStatus:looser:title'),
    draw: t('app:relationStatus:equality:title'),
  }[userRank]

  const infoSecondary = {
    winner: t('app:relationStatus:winner:description', {
      partnerName: partner.firstName,
    }),
    loser: t('app:relationStatus:looser:description'),
    draw: t('app:relationStatus:equality:description'),
  }[userRank]

  return (
    <Modal
      visible={shoulDisplayWeeklyRecap}
      emoji={emoji}
      onClose={closeWeeklyRecap}
      onAction={closeWeeklyRecap}
      primaryActionIconName="check"
    >
      <Badge color={badgeColor}>{badgeTitle}</Badge>

      <View style={styles.container}>
        <View style={styles.user}>
          <View style={styles.avatarContainer}>
            <Medal type={userRank} />

            <Avatar
              firstname={me.firstName}
              size="large"
              borderColor="highlight200"
            />
          </View>

          <Counter type={userRank}>{lastWeek.userTotalPoints}</Counter>
        </View>

        <View style={styles.user}>
          <View style={styles.avatarContainer}>
            <Medal type={partnerRank} />

            <Avatar firstname={partner.firstName} size="medium" />
          </View>

          <Counter type={partnerRank}>{lastWeek.partnerTotalPoints}</Counter>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Info color="white" primary={infoPrimary} secondary={infoSecondary} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 16,
  },
  container: {
    marginTop: 40,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 21,
  },
  avatarContainer: {
    position: 'relative',
  },
})
