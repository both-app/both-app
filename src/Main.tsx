import React, { useContext, useEffect } from 'react'
import { useFonts } from '@use-expo/font'
import { SplashScreen } from 'expo'

import { AuthNavigator, AuthContext } from './screens/auth'
import { App } from 'screens/app'

export const Main = () => {
  const { isConnected } = useContext(AuthContext)
  const [fontsLoaded] = useFonts({
    'DMSerifDisplay-Regular': require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
  })

  useEffect(() => {
    SplashScreen.preventAutoHide()
  })

  if (!fontsLoaded) {
    return null
  }

  if (isConnected) {
    return <App />
  }

  return <AuthNavigator />
}
