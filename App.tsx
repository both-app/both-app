import React from 'react'
import 'react-native-gesture-handler'
import { initI18n } from './src/res/i18n'
import * as Sentry from 'sentry-expo'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'

import {
  AuthContextProvider,
  AuthApiContextProvider,
} from 'screens/auth/contexts'

import { Main } from './src/Main'

const { manifest } = Constants

Sentry.init({
  dsn:
    'https://4a2650410f1a4db499d777c1abf78ebf@o381103.ingest.sentry.io/5207931',
  enableInExpoDevelopment: false,
  environment: manifest.releaseChannel || 'development',
  debug: manifest.releaseChannel === 'production' ? false : true,
})

Sentry.setRelease(manifest.revisionId)

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
