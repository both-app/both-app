import React, { useContext } from 'react'

import { AuthNavigator, AuthContext } from './screens/auth'
import { AppNavigator } from 'screens/app'
import { useFonts } from 'library/hooks/useFonts'

export const Main = () => {
  const { isConnected } = useContext(AuthContext)
  const { fontsLoaded } = useFonts({
    'gotham-bold': require('../assets/fonts/gothamRounded/GothamRoundedBold.ttf'),
    'gotham-book': require('../assets/fonts/gothamRounded/GothamRoundedBook.ttf'),
    'gotham-light': require('../assets/fonts/gothamRounded/GothamRoundedLight.ttf'),
    'gotham-medium': require('../assets/fonts/gothamRounded/GothamRoundedMedium.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  if (isConnected) {
    return <AppNavigator />
  }

  return <AuthNavigator />
}
