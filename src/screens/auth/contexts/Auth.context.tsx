import React, { FC, createContext, useMemo, useEffect, useState } from 'react'

import { getItem, setItem, clear } from 'res/storage'
import { wait } from 'res/utils'

interface AuthContextProps {
  isConnected: boolean
  login: (params: {
    jwtToken: string
    relation: Relation
    user: User
  }) => Promise<void>
  logout: (clearStorage: boolean) => Promise<void>
}

// @ts-ignore
const AuthContext = createContext<AuthContextProps>({})

const AuthContextProvider: FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const reHydrateData = async () => {
      const jwtToken = await getItem('jwtToken')

      if (jwtToken) {
        setIsConnected(true)
      }
    }

    reHydrateData()
  }, [])

  const login: AuthContextProps['login'] = async (params) => {
    await clear()
    await Promise.all([
      setItem('jwtToken', params.jwtToken),
      setItem('relation', params.relation),
      setItem('users', { me: params.user }),
    ])

    setIsConnected(true)
  }

  const logout = async (clearStorage: boolean) => {
    setIsConnected(false)

    if (clearStorage) {
      await wait(1000)
      await clear()
    }
  }

  const authContextApi = useMemo(
    () => ({
      isConnected,
      login,
      logout,
    }),
    [isConnected, login, logout]
  )

  return (
    <AuthContext.Provider value={authContextApi}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
