import React, { useContext } from 'react'

import { AuthNavigator, AuthContext } from './screens/auth'
import { AppNavigator } from './screens/app'

export const Main = () => {
  const { isConnected } = useContext(AuthContext)

  if (isConnected) {
    return <AppNavigator />
  }

  return <AuthNavigator />
}
