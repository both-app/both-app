import React, { createContext, FC, useEffect, useMemo, useState } from 'react'
import { useAppState } from 'hooks/useAppState'

import { api, APIResponse } from 'res/api'
import { getItem, setItem } from 'res/storage'

export enum ScoreSatus {
  Draw,
  UserWins,
  PartnerWins,
}

type GetUserScoreResponse = APIResponse<UserScore>

interface UserScoreState {
  partnerTotalPoints: number
  userTotalPoints: number
  userFavoriteTask: string | null
  partnerFavoriteTask: string | null
  total: number
}

const initialState: UserScoreState = {
  partnerTotalPoints: 0,
  userTotalPoints: 0,
  userFavoriteTask: null,
  partnerFavoriteTask: null,
  total: 0,
}

interface UserScoreContextProps extends UserScoreState {
  fetchUserScore: () => Promise<void>
  incrementUserPoints: (points: number) => void
  scoreStatus: ScoreSatus
}

// @ts-ignore
const UserScoreContext = createContext<UserScoreContextProps>({})

const UserScoreContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const [state, setState] = useState<UserScoreState>(initialState)

  useEffect(() => {
    const reHydrateData = async () => {
      const userScore = await getItem('userScore')

      if (userScore) {
        setState(userScore)
      }

      fetchUserScore()
    }

    reHydrateData()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchUserScore()
    }
  }, [appState])

  const fetchUserScore = async () => {
    const result = await api.get<GetUserScoreResponse>('user_tasks/recap')

    setItem('userScore', result.data.data)
    setState(result.data.data)
  }

  const incrementUserPoints = (points: number) =>
    setState({ ...state, userTotalPoints: state.userTotalPoints + points })

  const scoreStatus = useMemo((): ScoreSatus => {
    if (state.userTotalPoints === state.partnerTotalPoints) {
      return ScoreSatus.Draw
    }
    if (state.userTotalPoints > state.partnerTotalPoints) {
      return ScoreSatus.UserWins
    }
    if (state.userTotalPoints < state.partnerTotalPoints) {
      return ScoreSatus.PartnerWins
    }
  }, [state])

  const userScoreContextApi = useMemo(
    () => ({
      ...state,
      fetchUserScore,
      incrementUserPoints,
      scoreStatus,
    }),
    [state, fetchUserScore, incrementUserPoints]
  )

  return (
    <UserScoreContext.Provider value={userScoreContextApi}>
      {children}
    </UserScoreContext.Provider>
  )
}

export { UserScoreContext, UserScoreContextProvider }
