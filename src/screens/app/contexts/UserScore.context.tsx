import React, { createContext, FC, useEffect, useMemo, useState } from 'react'
import { getWeek, subWeeks } from 'date-fns'
import { useAppState } from 'hooks/useAppState'

import { api, APIResponse } from 'res/api'
import { getItem, setItem } from 'res/storage'

type GetUserScoreResponse = APIResponse<UserScore>

export enum ScoreSatus {
  Draw = 'Draw',
  UserWins = 'UserWins',
  PartnerWins = 'PartnerWins',
}

interface UserScoreState {
  currentWeek: UserScore
  global: UserScore
  lastWeek: UserScore
  lastWeeklyRecapDate: Date
  shoulDisplayWeeklyRecap: boolean
}

const initialState: UserScoreState = {
  currentWeek: {
    partnerTotalPoints: 0,
    userTotalPoints: 0,
    userFavoriteTask: null,
    partnerFavoriteTask: null,
    total: 0,
    status: ScoreSatus.Draw,
  },
  global: {
    partnerTotalPoints: 0,
    userTotalPoints: 0,
    userFavoriteTask: null,
    partnerFavoriteTask: null,
    total: 0,
    status: ScoreSatus.Draw,
  },
  lastWeek: {
    partnerTotalPoints: 0,
    userTotalPoints: 0,
    userFavoriteTask: null,
    partnerFavoriteTask: null,
    total: 0,
    status: ScoreSatus.Draw,
  },
  lastWeeklyRecapDate: new Date(),
  shoulDisplayWeeklyRecap: false,
}

interface UserScoreContextProps extends UserScoreState {
  fetchUserScore: () => Promise<void>
  fetchGlobalUserScore: () => Promise<void>
  incrementUserPoints: (points: number) => void
  closeWeeklyRecap: () => void
}

// @ts-ignore
const UserScoreContext = createContext<UserScoreContextProps>({})

const UserScoreContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const [state, setState] = useState<UserScoreState>(initialState)

  useEffect(() => {
    const reHydrateData = async () => {
      const [
        userScore,
        userGlobalScore,
        lastWeeklyRecapDate,
      ] = await Promise.all([
        getItem('userScore'),
        getItem('userGlobalScore'),
        getItem('lastWeeklyRecapDate'),
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

      if (lastWeeklyRecapDate) {
        console.log('rehydrate', getWeek(new Date(lastWeeklyRecapDate)))
        setState((userScoreState) => ({
          ...userScoreState,
          lastWeeklyRecapDate: new Date(lastWeeklyRecapDate),
        }))
      }

      fetchUserScore()
      fetchGlobalUserScore()
      fetchWeeklyRecap()
    }

    reHydrateData()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchUserScore()
      fetchGlobalUserScore()
      if (shouldFetchWeeklyRecap) {
        fetchWeeklyRecap()
      }
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
    //to remove
    // const lastWeeklyRecapDate = new Date()
    // setItem('lastWeeklyRecapDate', subWeeks(lastWeeklyRecapDate, 1))

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

  const fetchWeeklyRecap = async () => {
    const result = await api.get<GetUserScoreResponse>('user_tasks/recap', {
      params: { targetDate: subWeeks(new Date(), 1).getTime() },
    })
    const userScore = {
      ...result.data.data,
      status: getScoreStatus(result.data.data),
    }
    setState((userScoreState) => ({
      ...userScoreState,
      lastWeek: userScore,
    }))
  }

  const shouldFetchWeeklyRecap = useMemo(
    () => getWeek(new Date()) > getWeek(state.lastWeeklyRecapDate),
    [state.lastWeeklyRecapDate]
  )

  const shoulDisplayWeeklyRecap = useMemo(
    () => shouldFetchWeeklyRecap && !!state.lastWeek,
    [state.lastWeeklyRecapDate, state.lastWeek]
  )

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

  const closeWeeklyRecap = () => {
    const now = new Date()
    setItem('lastWeeklyRecapDate', now)
    return setState((userScoreState) => ({
      ...userScoreState,
      lastWeeklyRecapDate: now,
    }))
  }

  const userScoreContextApi = useMemo(
    () => ({
      ...state,
      fetchUserScore,
      fetchGlobalUserScore,
      incrementUserPoints,
      closeWeeklyRecap,
      shoulDisplayWeeklyRecap,
    }),
    [state, fetchUserScore, fetchGlobalUserScore, shoulDisplayWeeklyRecap]
  )

  return (
    <UserScoreContext.Provider value={userScoreContextApi}>
      {children}
    </UserScoreContext.Provider>
  )
}

const getScoreStatus = (userScore: UserScore): ScoreSatus => {
  if (userScore.userTotalPoints === userScore.partnerTotalPoints) {
    return ScoreSatus.Draw
  }
  if (userScore.userTotalPoints > userScore.partnerTotalPoints) {
    return ScoreSatus.UserWins
  }
  if (userScore.userTotalPoints < userScore.partnerTotalPoints) {
    return ScoreSatus.PartnerWins
  }
}

export { UserScoreContext, UserScoreContextProvider }
