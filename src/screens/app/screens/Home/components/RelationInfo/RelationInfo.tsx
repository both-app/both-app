import React, { useContext } from 'react'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { Body } from './Body'

export const RelationInfo = () => {
  const { me, partner } = useContext(UsersContext)
  const {
    currentWeek: { userTotalPoints, partnerTotalPoints },
  } = useContext(UserScoreContext)

  return (
    <Body
      leftFirstName={me.firstName}
      leftAvatarUrl={me.avatarUrl}
      rightFirstName={partner.firstName || '⌛️'}
      rightAvatarUrl={partner.avatarUrl}
      leftPoints={userTotalPoints}
      rightPoints={partnerTotalPoints}
    />
  )
}
