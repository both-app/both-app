import React, { useContext } from 'react'

import { ConnectContext } from './Connect.context'
import { NotConnectedNavigator } from './screens/notConnected/NotConnectedNavigator'
import { ConnectedNavigator } from './screens/connected/ConnectedNavigator'

export const Main = () => {
  const { isConnected } = useContext(ConnectContext)

  if (isConnected) {
    return <ConnectedNavigator />
  }

  return <NotConnectedNavigator />
}
