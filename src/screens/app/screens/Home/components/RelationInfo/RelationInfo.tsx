import React, { useContext } from 'react'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { Body } from './Body'

export const RelationInfo = () => {
  const { me, partner } = useContext(UsersContext)
  const {
    current: { userTotalPoints, partnerTotalPoints },
  } = useContext(UserScoreContext)
  return (
    <Body
      leftFirstName={me.firstName}
      rightFirstName={partner.firstName || '⌛️'}
      leftPoints={userTotalPoints}
      rightPoints={partnerTotalPoints}
    />
  )
}
