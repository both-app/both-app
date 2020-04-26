import React, { useContext } from 'react'

import { TaskAddedModal } from './components/TaskAddedModal'
import { ShareRelationKeyModal } from './components/ShareRelationKeyModal'
import { UserTasks } from './components/UserTasks'
import { RelationStatus } from '../../components/RelationStatus'
import { RelationInfo } from './components/RelationInfo'
import { WeekInfo } from './components/WeekInfo'
import { ShareRelationKey } from './components/ShareRelationKey'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { Layout } from 'library/layouts/Layout'
import { CountdownBadge } from '../Leaderboard/components/CountdownBadge'

export const DashboardScreen = () => {
  const { partner } = useContext(UsersContext)

  return (
    <Layout
      header={
        <>
          <WeekInfo />
          <RelationInfo />
          <RelationStatus />
        </>
      }
      badge={!partner.id ? <ShareRelationKey /> : <CountdownBadge />}
    >
      <UserTasks />

      <ShareRelationKeyModal />
      <TaskAddedModal />
    </Layout>
  )
}
