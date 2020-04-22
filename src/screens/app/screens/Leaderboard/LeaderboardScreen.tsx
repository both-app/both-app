import React, { useContext } from 'react'
import { ScrollView } from 'react-native'

import { Layout } from 'library/layouts/Layout'

import { UserRecap } from './components/UserRecap'
import { CountdownBadge } from './components/CountdownBadge'
import {
  UserScoreContext,
  ScoreSatus,
} from 'screens/app/contexts/UserScore.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { DrawHeader, WinnerHeader } from './components/Header'
import { TaskContext } from 'screens/app/contexts/Task.context'

interface RankedUser extends User {
  points: number
  favoriteTask: Task
  isWinner: boolean
}

export const LeaderboardScreen = () => {
  const {
    userTotalPoints,
    partnerTotalPoints,
    userFavoriteTask,
    partnerFavoriteTask,
    scoreStatus,
  } = useContext(UserScoreContext)
  const { me, partner } = useContext(UsersContext)
  const { getTaskById } = useContext(TaskContext)

  const rankedUser = {
    ...me,
    points: userTotalPoints,
    favoriteTask: getTaskById(userFavoriteTask),
    isWinner:
      scoreStatus === ScoreSatus.UserWins || scoreStatus === ScoreSatus.Draw,
  }

  let ranking: RankedUser[]

  if (!partner.id) {
    ranking = [rankedUser]
  } else {
    const rankedPartner = {
      ...partner,
      points: partnerTotalPoints,
      favoriteTask: getTaskById(partnerFavoriteTask),
      isWinner:
        scoreStatus === ScoreSatus.PartnerWins ||
        scoreStatus === ScoreSatus.Draw,
    }

    if (scoreStatus === ScoreSatus.Draw) {
      ranking = [rankedUser, rankedPartner]
    } else if (scoreStatus === ScoreSatus.UserWins) {
      ranking = [rankedUser, rankedPartner]
    } else {
      ranking = [rankedPartner, rankedUser]
    }
  }

  return (
    <Layout
      header={
        scoreStatus === ScoreSatus.Draw ? (
          <DrawHeader />
        ) : (
          <WinnerHeader
            firstName={ranking[0].firstName}
            gender={ranking[0].gender}
          />
        )
      }
      badge={<CountdownBadge />}
    >
      <ScrollView>
        {ranking.map((user: RankedUser) => (
          <UserRecap
            key={user.id}
            firstName={user.firstName}
            isWinner={user.isWinner}
            points={user.points}
            taskName={user.favoriteTask.name}
          />
        ))}
      </ScrollView>
    </Layout>
  )
}
