import React, { FC, createContext, useState, useMemo } from 'react'

interface UploadFileParams {
  file: File
  fileName: string
  employeeId?: string
}

interface ConnectedContextProps {
  isConnected: boolean
  setIsConnected: () => void
}

const ConnectContext = createContext<ConnectedContextProps>({
  isConnected: false,
  // @ts-ignore
  setIsConnected: (value: boolean) => ({}),
})

const ConnectContextProvider: FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)

  const connectContextApi = useMemo(
    () => ({
      isConnected,
      setIsConnected,
    }),
    [setIsConnected, isConnected]
  )

  return (
    <ConnectContext.Provider value={connectContextApi}>
      {children}
    </ConnectContext.Provider>
  )
}

export { ConnectContext, ConnectContextProvider }
