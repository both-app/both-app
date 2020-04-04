import 'react-native-gesture-handler'

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContextProvider } from './src/screens/auth'
import { CameraContextProvider } from './src/screens/app/screens/Camera'
import { Main } from './src/Main'

export default () => (
  <CameraContextProvider>
    <AuthContextProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AuthContextProvider>
  </CameraContextProvider>
)
