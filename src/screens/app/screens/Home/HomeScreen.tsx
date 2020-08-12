import React, { useContext } from 'react'

import { Layout } from 'library/layouts/Layout'

import { useStatusBar } from 'hooks/useStatusBar'

import { TaskAddedModal } from './components/TaskAddedModal'
import { ShareRelationKeyModal } from './components/ShareRelationKeyModal'
import { UserTasks } from './components/UserTasks'
import { RelationStatus } from '../../components/RelationStatus'
import { RelationInfo } from './components/RelationInfo'
import { WeekInfo } from './components/WeekInfo'
import { ShareRelationKey } from './components/ShareRelationKey'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { CountdownBadge } from '../Leaderboard/components/CountdownBadge'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'

export const HomeScreen = () => {
  useStatusBar('light-content')
  const { partner } = useContext(UsersContext)
  const { currentWeek } = useContext(UserScoreContext)

  return (
    <Layout
      header={
        <>
          <WeekInfo />
          <RelationInfo />
          <RelationStatus scoreStatus={currentWeek.status} />
        </>
      }
      center={!partner.id ? <ShareRelationKey /> : <CountdownBadge />}
    >
      <UserTasks />

      <ShareRelationKeyModal />
      <TaskAddedModal />
    </Layout>
  )
}
