import React from 'react'
import { render } from 'react-native-testing-library'

import { AuthNavigator } from '../Auth.navigator'
import { AuthContextProvider, AuthApiContextProvider } from '../contexts'
import { NavigationContainer } from '@react-navigation/native'

const renderWithMainProviders = ({ children }) => (
  <AuthContextProvider>
    <AuthApiContextProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </AuthApiContextProvider>
  </AuthContextProvider>
)

describe('SelectScreen', () => {
  test('should display the select screen', () => {
    const { debug } = render(<AuthNavigator />, {
      wrapper: renderWithMainProviders,
    })

    debug()
  })
})
