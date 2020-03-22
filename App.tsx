import 'react-native-gesture-handler'

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ConnectContextProvider } from './src/Connect.context'
import { Main } from './src'

export default () => (
  <ConnectContextProvider>
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  </ConnectContextProvider>
)
