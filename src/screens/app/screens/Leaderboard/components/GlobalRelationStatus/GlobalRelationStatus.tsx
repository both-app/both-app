import React, { memo, FC } from 'react'

import { Info } from 'library/components/Info'

import { useT } from 'res/i18n'

interface GlobalRelationStatusProps {
  scoreStatus: ScoreSatus
}

export const GlobalRelationStatus: FC<GlobalRelationStatusProps> = memo(
  ({ scoreStatus }) => {
    const { t } = useT()

    if (scoreStatus === 'Draw') {
      return (
        <Info
          primary={t('app:screen:leaderboard:global:title')}
          secondary={t('app:screen:leaderboard:global:equality:description')}
          color="white"
        />
      )
    }

    if (scoreStatus === 'UserWins') {
      return (
        <Info
          primary={t('app:screen:leaderboard:global:title')}
          secondary={t('app:screen:leaderboard:global:winner:description')}
          color="white"
        />
      )
    }

    if (scoreStatus === 'PartnerWins') {
      return (
        <Info
          primary={t('app:screen:leaderboard:global:title')}
          secondary={t('app:screen:leaderboard:global:looser:description')}
          color="white"
        />
      )
    }

    return null
  }
)
