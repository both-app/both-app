import React, { FC, createContext, useState, useMemo } from 'react'

interface AuthContextProps {
  isConnected: boolean
  setIsConnected: () => void
}

const AuthContext = createContext<AuthContextProps>({
  isConnected: false,
  // @ts-ignore
  setIsConnected: (value: boolean) => ({}),
})

const AuthContextProvider: FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)

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
