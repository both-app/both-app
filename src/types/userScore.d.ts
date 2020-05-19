interface UserScore {
  total: number
  userTotalPoints: number
  partnerTotalPoints: number
  userFavoriteTask: string | null
  partnerFavoriteTask: string | null
  status?: 'Draw' | 'UserWins' | 'PartnerWins'
}
