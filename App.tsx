import 'react-native-gesture-handler'

import React from 'react'
import * as Sentry from 'sentry-expo'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContextProvider } from './src/screens/auth'
import { Main } from './src/Main'

Sentry.init({
  dsn: 'https://3247720673cf460bb7979a5e0554d98f@sentry.io/5175612',
  enableInExpoDevelopment: false,
  debug: false,
})

Sentry.setRelease(Constants.manifest.revisionId)

export default () => (
  <AuthContextProvider>
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  </AuthContextProvider>
)
