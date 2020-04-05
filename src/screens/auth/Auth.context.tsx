import React, { FC, createContext, useState, useMemo } from 'react'
import { api, APIResponse } from 'res/api'
import { setItem } from 'res/storage'

interface AuthContextProps {
  isConnected: boolean
  setIsConnected: () => void
}

type AuthResponse = APIResponse<{
  jwtToken: string
  relation: { id: string; code: string }
  user: {
    id: string
    firstName: string
    gender: string
    relationId: string
    birthDate: string
  }
}>

const AuthContext = createContext<AuthContextProps>({
  isConnected: false,
  // @ts-ignore
  setIsConnected: (value: boolean) => ({}),
})

const AuthContextProvider: FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)

  const createRelation = async (params: {
    firstName: string
    birthDate: number
    gender: string
  }) => {
    const result = await api.post<AuthResponse>('relation', params)

    await setItem('jwtToken', result.data.data.jwtToken)
  }

  const joinRelation = async (params: {
    firstName: string
    birthDate: number
    gender: string
    code: string
  }) => {
    const result = await api.post<AuthResponse>('relation/join', params)

    await setItem('jwtToken', result.data.data.jwtToken)
  }

  const authContextApi = useMemo(
    () => ({
      isConnected,
      setIsConnected,
    }),
    [setIsConnected, isConnected]
  )

  return (
    <AuthContext.Provider value={authContextApi}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
