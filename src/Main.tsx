import React, { useContext } from 'react'

import { AuthNavigator, AuthContext } from './screens/auth'
import { AppNavigator } from 'screens/app'
import { useFonts } from 'library/hooks/useFonts'

export const Main = () => {
  const { isConnected } = useContext(AuthContext)
  const { fontsLoaded } = useFonts({
    'DMSerifDisplay-Regular': require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  if (isConnected) {
    return <AppNavigator />
  }

  return <AuthNavigator />
}
