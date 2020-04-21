import React, { useContext } from 'react'

import { Info } from 'library/components/Info'

import { UserScoreContext } from 'screens/app/contexts/UserScore.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { useT } from 'res/i18n'

export const RelationStatus = () => {
  const { t } = useT()
  const { partner } = useContext(UsersContext)
  const { userTotalPoints, partnerTotalPoints } = useContext(UserScoreContext)

  if (!partner.id) {
    return (
      <Info
        color="white"
        primary={t('app:relationStatus:noPartner:title')}
        secondary={t('app:relationStatus:noPartner:description')}
      />
    )
  }

  if (userTotalPoints > partnerTotalPoints) {
    return (
      <Info
        color="white"
        primary={t('app:relationStatus:winner:title')}
        secondary={t('app:relationStatus:winner:description', {
          partnerName: partner.firstName,
        })}
      />
    )
  }

  if (partnerTotalPoints > userTotalPoints) {
    return (
      <Info
        color="white"
        primary={t('app:relationStatus:looser:title')}
        secondary={t('app:relationStatus:looser:description', {
          partnerName: partner.firstName,
        })}
      />
    )
  }

  return (
    <Info
      color="white"
      primary={t('app:relationStatus:equality:title')}
      secondary={t('app:relationStatus:equality:description')}
    />
  )
}
