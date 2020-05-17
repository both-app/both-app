import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import SegmentedControl from 'react-native-segmented-control-tab'

import { Layout } from 'library/layouts/Layout'
import { Scroll } from 'library/layouts/Scroll'
import {
  UserScoreContext,
  ScoreSatus,
} from 'screens/app/contexts/UserScore.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { UserRecap, UserRecapPlaceholder } from './components/UserRecap'
import { CountdownBadge } from './components/CountdownBadge'
import { DrawHeader, WinnerHeader } from './components/Header'
import { colors } from 'res/colors'

interface RankedUser extends User {
  points: number
  favoriteTask: Task
  isWinner: boolean
  isMe: boolean
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
  const [selectedIndex, setSelectedIndex] = useState(0)

  const rankedUser = {
    ...me,
    isMe: true,
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
      isMe: false,
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
        <>
          <SegmentedControl
            values={['Semaine', 'Global']}
            selectedIndex={selectedIndex}
            onTabPress={setSelectedIndex}
            tabsContainerStyle={{
              marginBottom: 50,
              height: 35,
              backgroundColor: 'rgba(118,118,128,0.24)',
              borderRadius: 8,
            }}
            borderRadius={6}
            tabStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderRadius: 6,
              margin: 3,
            }}
            activeTabStyle={{ backgroundColor: '#636366' }}
            tabTextStyle={{ color: 'white', fontWeight: '500' }}
          />
          {scoreStatus === ScoreSatus.Draw ? (
            <DrawHeader />
          ) : (
            <WinnerHeader
              firstName={ranking[0].firstName}
              gender={ranking[0].gender}
            />
          )}
        </>
      }
      badge={<CountdownBadge />}
    >
      <Scroll style={styles.scrollContainer} marginTop={24} marginBottom={24}>
        {ranking.map((user: RankedUser) => (
          <UserRecap
            key={user.id}
            isMe={user.isMe}
            firstName={user.firstName}
            isWinner={user.isWinner}
            points={user.points}
            taskName={user.favoriteTask?.name || ''}
          />
        ))}

        {ranking.length === 1 && <UserRecapPlaceholder />}
      </Scroll>
    </Layout>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginHorizontal: 24,
  },
})
