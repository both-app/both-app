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

export const HomeScreen = () => {
  useStatusBar('light-content')
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
      center={!partner.id ? <ShareRelationKey /> : <CountdownBadge />}
    >
      <UserTasks />

      <ShareRelationKeyModal />
      <TaskAddedModal />
    </Layout>
  )
}
