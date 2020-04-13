import React, { useContext, useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'

import { Auth, AuthContext } from './screens/auth'
import { App } from 'screens/app'

export const Main = () => {
  const [isSplashReady, setIsSplashReady] = useState<boolean>(false)
  const { isConnected } = useContext(AuthContext)

  const loadRessources = async () => {
    // Load the Font
    await Font.loadAsync({
      'DMSerifDisplay-Regular': require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
    })

    // Load the SplashScreen image
    return Asset.fromModule(require('../assets/splash.png')).downloadAsync()
  }

  if (!isSplashReady) {
    return (
      <AppLoading
        startAsync={loadRessources}
        onFinish={() => setIsSplashReady(true)}
      />
    )
  }

  if (isConnected) {
    return <App />
  }

  return <Auth />
}
