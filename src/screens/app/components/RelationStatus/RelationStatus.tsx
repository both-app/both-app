import React, { useContext, FC } from 'react'

import { Info } from 'library/components/Info'

import { useT } from 'res/i18n'

import { UsersContext } from 'screens/app/contexts/Users.context'

interface RelationStatusProps {
  scoreStatus: ScoreSatus
}

export const RelationStatus: FC<RelationStatusProps> = ({ scoreStatus }) => {
  const { t } = useT()
  const { me, partner } = useContext(UsersContext)

  if (!partner.id) {
    return (
      <Info
        color="white"
        primary={t(`app:relationStatus:noPartner:title:${me.gender}`)}
        secondary={t(`app:relationStatus:noPartner:description:${me.gender}`)}
      />
    )
  }

  if (scoreStatus === 'Draw') {
    return (
      <Info
        color="white"
        primary={t('app:relationStatus:equality:title')}
        secondary={t('app:relationStatus:equality:description')}
      />
    )
  }

  if (scoreStatus === 'UserWins') {
    return (
      <Info
        color="white"
        primary={t(`app:relationStatus:winner:title:${me.gender}`)}
        secondary={t('app:relationStatus:winner:description', {
          partnerName: partner.firstName,
        })}
      />
    )
  }

  if (scoreStatus === 'PartnerWins') {
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

  return null
}
