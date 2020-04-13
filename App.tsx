import React from 'react'
import 'react-native-gesture-handler'
import { initI18n } from './src/res/i18n'
import * as Sentry from 'sentry-expo'
import Constants from 'expo-constants'

import { NavigationContainer } from '@react-navigation/native'

import { AuthContextProvider } from './src/screens/auth'
import { AuthApiContextProvider } from 'screens/auth/AuthApi.context'
import { Main } from './src/Main'

Sentry.init({
  dsn: 'https://3247720673cf460bb7979a5e0554d98f@sentry.io/5175612',
  enableInExpoDevelopment: true,
  debug: true,
})

Sentry.setRelease(Constants.manifest.revisionId)

initI18n()

export default () => (
  <AuthContextProvider>
    <AuthApiContextProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AuthApiContextProvider>
  </AuthContextProvider>
)
