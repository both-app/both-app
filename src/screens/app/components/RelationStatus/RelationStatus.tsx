import React, { useContext } from 'react'

import { Info } from 'library/components/Info'

import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { UsersContext } from 'screens/app/contexts/Users.context'

export const RelationStatus = () => {
  const { partner } = useContext(UsersContext)
  const { userTotalPoints, partnerTotalPoints } = useContext(UserScoreContext)

  if (!partner.id) {
    return (
      <Info
        color="white"
        primary="🏆 T’es premier au classement"
        secondary="Normal t’es seul… Relance ton acolyte !"
      />
    )
  }

  if (userTotalPoints > partnerTotalPoints) {
    return (
      <Info
        color="white"
        primary="🏆 T’es premier au classement"
        secondary="Normal t’es seul… Relance ton acolyte !"
      />
    )
  }

  if (partnerTotalPoints > userTotalPoints) {
    return (
      <Info
        color="white"
        primary="🏆 T’es premier au classement"
        secondary="Normal t’es seul… Relance ton acolyte !"
      />
    )
  }

  return (
    <Info
      color="white"
      primary="🏆 T’es premier au classement"
      secondary="Normal t’es seul… Relance ton acolyte !"
    />
  )
}
