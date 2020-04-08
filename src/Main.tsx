import React, { useContext } from 'react'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font'

import { AuthNavigator, AuthContext } from './screens/auth'
import { App } from 'screens/app'

export const Main = () => {
  const { isConnected } = useContext(AuthContext)
  const [fontsLoaded] = useFonts({
    'DMSerifDisplay-Regular': require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  if (isConnected) {
    return <App />
  }

  return <AuthNavigator />
}
