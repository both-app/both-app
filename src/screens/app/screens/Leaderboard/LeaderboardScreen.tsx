import React, { useContext, useState, useEffect } from 'react'
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
import { useT } from 'res/i18n'
import { RelationStatus } from 'screens/app/components/RelationStatus'

interface RankedUser extends User {
  points: number
  favoriteTask: Task
  isWinner: boolean
  isMe: boolean
}

export const LeaderboardScreen = ({ navigation }) => {
  const { current, global } = useContext(UserScoreContext)
  const { me, partner } = useContext(UsersContext)
  const { getTaskById } = useContext(TaskContext)
  const [sectionIndex, setSectionIndex] = useState(0)
  const { t } = useT()

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setSectionIndex(0)
    })
    return unsubscribe
  }, [navigation])

  const scoreContext = sectionIndex ? global : current

  const {
    userTotalPoints,
    partnerFavoriteTask,
    partnerTotalPoints,
    userFavoriteTask,
    status,
  } = scoreContext

  const rankedUser = {
    ...me,
    isMe: true,
    points: userTotalPoints,
    favoriteTask: getTaskById(userFavoriteTask),
    isWinner: status === ScoreSatus.UserWins || status === ScoreSatus.Draw,
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
      isWinner: status === ScoreSatus.PartnerWins || status === ScoreSatus.Draw,
    }

    if (status === ScoreSatus.Draw) {
      ranking = [rankedUser, rankedPartner]
    } else if (status === ScoreSatus.UserWins) {
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
            values={[
              t('app:screen:leaderboard:tabs:week'),
              t('app:screen:leaderboard:tabs:global'),
            ]}
            selectedIndex={sectionIndex}
            onTabPress={setSectionIndex}
            tabsContainerStyle={styles.tabsContainer}
            tabStyle={styles.tab}
            borderRadius={6}
            activeTabStyle={styles.activeTab}
            tabTextStyle={styles.tabText}
          />
          {status === ScoreSatus.Draw ? (
            <DrawHeader />
          ) : (
            <WinnerHeader
              firstName={ranking[0].firstName}
              gender={ranking[0].gender}
            />
          )}
          <RelationStatus scoreStatus={scoreContext.status} />
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
  tabsContainer: {
    marginBottom: 50,
    height: 35,
    backgroundColor: 'rgba(118,118,128,0.24)',
    borderRadius: 8,
  },
  tab: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 6,
    margin: 3,
  },
  activeTab: { backgroundColor: '#636366' },
  tabText: { color: 'white', fontWeight: '500' },
})
