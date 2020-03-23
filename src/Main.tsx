import React, { useContext } from 'react'

import { ConnectContext } from './Connect.context'
import { AuthNavigator } from './screens/auth/AuthNavigator'
import { ConnectedNavigator } from './screens/connected/ConnectedNavigator'

export const Main = () => {
  const { isConnected } = useContext(ConnectContext)

  if (isConnected) {
    return <ConnectedNavigator />
  }

  return <AuthNavigator />
}
