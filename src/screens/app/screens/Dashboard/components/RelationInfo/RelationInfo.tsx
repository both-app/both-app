import React, { useContext, useMemo } from 'react'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

import { Body } from './Body'

export const RelationInfo = () => {
  const { me, partner } = useContext(UsersContext)
  const { getUserWeekTasksByUserId, userTasks } = useContext(UserTaskContext)

  const getUserPoints = (userId: string) =>
    getUserWeekTasksByUserId(userId).reduce(
      (acc: number, { points }) => acc + points,
      0
    )

  const leftPoints = useMemo(() => getUserPoints(me.id), [userTasks])
  const rightPoints = useMemo(() => getUserPoints(partner.id), [userTasks])

  return (
    <Body
      leftFirstName={me.firstName}
      rightFirstName={partner.firstName || '⌛️'}
      leftPoints={leftPoints}
      rightPoints={rightPoints}
    />
  )
}
