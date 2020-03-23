import 'react-native-gesture-handler'

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContextProvider } from './src/screens/auth'
import { Main } from './src/Main'

export default () => (
  <AuthContextProvider>
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  </AuthContextProvider>
)
