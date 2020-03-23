import React, { useContext } from 'react'

import { AuthNavigator, AuthContext } from './screens/auth'
import { ConnectedNavigator } from './screens/connected'

export const Main = () => {
  const { isConnected } = useContext(AuthContext)

  if (isConnected) {
    return <ConnectedNavigator />
  }

  return <AuthNavigator />
}
