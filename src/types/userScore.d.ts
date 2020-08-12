type ScoreSatus = 'Draw' | 'UserWins' | 'PartnerWins'

type ScoreType = 'global' | 'currentWeek'

interface UserScore {
  total: number
  userTotalPoints: number
  partnerTotalPoints: number
  userFavoriteTask: string | null
  partnerFavoriteTask: string | null
  status?: ScoreSatus
}
