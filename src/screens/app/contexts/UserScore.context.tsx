import React, { createContext, FC, useEffect, useMemo, useState } from 'react'
import { useAppState } from 'hooks/useAppState'

import { api, APIResponse } from 'res/api'
import { getItem, setItem } from 'res/storage'

type GetUserScoreResponse = APIResponse<UserScore>

interface UserScoreState {
  currentWeek: UserScore
  global: UserScore
}

const initialState: UserScoreState = {
  currentWeek: {
    partnerTotalPoints: 0,
    userTotalPoints: 0,
    userFavoriteTask: null,
    partnerFavoriteTask: null,
    total: 0,
    status: 'Draw',
  },
  global: {
    partnerTotalPoints: 0,
    userTotalPoints: 0,
    userFavoriteTask: null,
    partnerFavoriteTask: null,
    total: 0,
    status: 'Draw',
  },
}

interface UserScoreContextProps extends UserScoreState {
  fetchUserScore: () => Promise<void>
  fetchGlobalUserScore: () => Promise<void>
  incrementUserPoints: (points: number) => void
}

// @ts-ignore
const UserScoreContext = createContext<UserScoreContextProps>({})

const UserScoreContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const [state, setState] = useState<UserScoreState>(initialState)

  useEffect(() => {
    const reHydrateData = async () => {
      const [userScore, userGlobalScore] = await Promise.all([
        getItem('userScore'),
        getItem('userGlobalScore'),
      ])

      if (userScore) {
        setState((userScoreState) => ({
          ...userScoreState,
          currentWeek: { ...userScore, status: getScoreStatus(userScore) },
        }))
      }

      if (userGlobalScore) {
        setState((userScoreState) => ({
          ...userScoreState,
          global: {
            ...userGlobalScore,
            status: getScoreStatus(userGlobalScore),
          },
        }))
      }

      fetchUserScore()
      fetchGlobalUserScore()
    }

    reHydrateData()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchUserScore()
      fetchGlobalUserScore()
    }
  }, [appState])

  const fetchUserScore = async () => {
    const result = await api.get<GetUserScoreResponse>('user_tasks/recap')
    const userScore = {
      ...result.data.data,
      status: getScoreStatus(result.data.data),
    }

    setItem('userScore', userScore)
    setState((userScoreState) => ({
      ...userScoreState,
      currentWeek: userScore,
    }))
  }

  const fetchGlobalUserScore = async () => {
    const result = await api.get<GetUserScoreResponse>(
      'user_tasks/recap/general'
    )
    const userGlobalScore = {
      ...result.data.data,
      status: getScoreStatus(result.data.data),
    }
    setItem('userGlobalScore', userGlobalScore)
    setState((userScoreState) => ({
      ...userScoreState,
      global: userGlobalScore,
    }))
  }

  const incrementUserPoints = (points: number) => {
    return setState((userScoreState) => ({
      ...userScoreState,
      currentWeek: {
        ...userScoreState.currentWeek,
        userTotalPoints: userScoreState.currentWeek.userTotalPoints + points,
      },
      global: {
        ...userScoreState.global,
        userTotalPoints: userScoreState.global.userTotalPoints + points,
      },
    }))
  }

  const userScoreContextApi = useMemo(
    () => ({
      ...state,
      fetchUserScore,
      fetchGlobalUserScore,
      incrementUserPoints,
    }),
    [state, fetchUserScore, fetchGlobalUserScore, incrementUserPoints]
  )

  return (
    <UserScoreContext.Provider value={userScoreContextApi}>
      {children}
    </UserScoreContext.Provider>
  )
}

const getScoreStatus = (userScore: UserScore): ScoreSatus => {
  if (userScore.userTotalPoints === userScore.partnerTotalPoints) {
    return 'Draw'
  }

  if (userScore.userTotalPoints > userScore.partnerTotalPoints) {
    return 'UserWins'
  }

  if (userScore.userTotalPoints < userScore.partnerTotalPoints) {
    return 'PartnerWins'
  }
}

export { UserScoreContext, UserScoreContextProvider }
