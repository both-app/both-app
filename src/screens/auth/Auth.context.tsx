import React, { FC, createContext, useMemo, useEffect, useState } from 'react'

import { getItem, setItem, clear } from 'res/storage'

interface AuthContextProps {
  isConnected: boolean
  login: (params: {
    jwtToken: string
    relation: Relation
    user: User
  }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
  isConnected: false,
  // @ts-ignore
  login: () => {},
  // @ts-ignore
  logout: () => {},
})

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
    await Promise.all([
      setItem('jwtToken', params.jwtToken),
      setItem('relation', params.relation),
      setItem('users', { me: params.user }),
    ])

    setIsConnected(true)
  }

  const logout = async () => {
    await clear()
    setIsConnected(false)
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
