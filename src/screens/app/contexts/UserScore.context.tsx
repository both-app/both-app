import { useAppState } from 'hooks/useAppState'
import React, { createContext, FC, useEffect, useMemo, useState } from 'react'
import { api, APIResponse } from 'res/api'
type GetUserScoreResponse = APIResponse<UserScore>

interface UserScoreState {
  partnerTotalPoints: number
  userTotalPoints: number
  total: number
}

const initialState: UserScoreState = {
  partnerTotalPoints: 0,
  userTotalPoints: 0,
  total: 0,
}

interface UserScoreContextProps extends UserScoreState {
  fetchUserScore: () => Promise<void>
}

// @ts-ignore
const UserScoreContext = createContext<UserScoreContextProps>({})

const UserScoreContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const [state, setState] = useState<UserScoreState>(initialState)

  useEffect(() => {
    fetchUserScore()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchUserScore()
    }
  }, [appState])

  const fetchUserScore = async () => {
    const result = await api.get<GetUserScoreResponse>('user_tasks/recap')
    return setState(result.data.data)
  }

  const userScoreContextApi = useMemo(
    () => ({
      ...state,
      fetchUserScore,
    }),
    [state, fetchUserScore]
  )

  return (
    <UserScoreContext.Provider value={userScoreContextApi}>
      {children}
    </UserScoreContext.Provider>
  )
}

export { UserScoreContext, UserScoreContextProvider }
