import React, { useContext, useMemo } from 'react'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

import { Body } from './Body'

export const RelationInfo = () => {
  const { me, partner } = useContext(UsersContext)
  const { score } = useContext(UserTaskContext)

  return (
    <Body
      leftFirstName={me.firstName}
      rightFirstName={partner.firstName || '⌛️'}
      leftPoints={score.userTotalPoints}
      rightPoints={score.partnerTotalPoints}
    />
  )
}
