import React, { useContext, useMemo } from 'react'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

import { Body } from './Body'

export const RelationInfo = () => {
  const { me, partner } = useContext(UsersContext)
  const { getUserTasksByUserId, allIds } = useContext(UserTaskContext)

  const getUserPoints = (userId: string) =>
    getUserTasksByUserId(userId).reduce((acc, { points }) => acc + points, 0)

  const leftPoints = useMemo(() => getUserPoints(me.id), [allIds])
  const rightPoints = useMemo(() => getUserPoints(partner.id), [allIds])

  return (
    <Body
      leftFirstName={me.firstName}
      rightFirstName={partner.firstName || '⌛️'}
      leftPoints={leftPoints}
      rightPoints={rightPoints}
    />
  )
}
