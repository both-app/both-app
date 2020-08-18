import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useStatusBar } from 'hooks/useStatusBar'

import { Layout } from 'library/layouts/Layout'
import { Scroll } from 'library/layouts/Scroll'
import { SegmentedControl } from 'library/components/SegmentedControl'

import { useT } from 'res/i18n'

import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { TaskContext } from 'screens/app/contexts/Task.context'
import { RelationStatus } from 'screens/app/components/RelationStatus'

import { UserRecap, UserRecapPlaceholder } from './components/UserRecap'
import { CountdownBadge } from './components/CountdownBadge'
import { DrawHeader, WinnerHeader } from './components/Header'
import { GlobalRelationStatus } from './components/GlobalRelationStatus'

export const LeaderboardScreen = () => {
  useStatusBar('light-content')
  const { currentWeek, global } = useContext(UserScoreContext)
  const navigation = useNavigation()
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

  const currentTab = (sectionIndex ? 'global' : 'currentWeek') as ScoreType
  const scoreContext = currentTab === 'global' ? global : currentWeek

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
    isWinner: status === 'UserWins' || status === 'Draw',
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
      isWinner: status === 'PartnerWins' || status === 'Draw',
    }

    if (status === 'Draw') {
      ranking = [rankedUser, rankedPartner]
    } else if (status === 'UserWins') {
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
            activeTabBackgroundColor="grey100"
            backgroundColor="rgba(118,118,128,0.24)"
            textColor="white"
          />

          {status === 'Draw' ? (
            <DrawHeader scoreType={currentTab} />
          ) : (
            <WinnerHeader scoreType={currentTab} rankedUser={ranking[0]} />
          )}

          {currentTab === 'global' ? (
            <GlobalRelationStatus scoreStatus={status} />
          ) : (
            <RelationStatus scoreStatus={status} />
          )}
        </>
      }
      center={<CountdownBadge />}
    >
      <Scroll style={styles.scrollContainer} marginTop={24} marginBottom={24}>
        {ranking.map((user: RankedUser) => (
          <UserRecap
            key={user.id}
            isMe={user.isMe}
            avatarUrl={user.avatarUrl}
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
