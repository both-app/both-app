import React, { FC, createContext, useMemo, useState, useEffect } from 'react'
import { getItem, setItem, removeItem } from 'res/storage'

interface AuthContextProps {
  isConnected: boolean
  login: (jwtToken: string) => Promise<void>
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
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    const checkIfConnected = async () => {
      const jwtToken = await getItem('jwtToken')

      if (jwtToken) {
        setIsConnected(true)
      }
    }

    checkIfConnected()
  }, [])

  const login = async (jwtToken: string) => {
    await setItem('jwtToken', jwtToken)
    setIsConnected(true)
  }

  const logout = async () => {
    await removeItem('jwtToken')
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
