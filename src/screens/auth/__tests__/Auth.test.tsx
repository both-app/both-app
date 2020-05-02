import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import { NavigationContainer } from '@react-navigation/native'

import { AuthNavigator } from '../Auth.navigator'
import { AuthContextProvider, AuthApiContextProvider } from '../contexts'

const renderWithMainProviders = ({ children }) => (
  <AuthContextProvider>
    <AuthApiContextProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </AuthApiContextProvider>
  </AuthContextProvider>
)

describe.skip('SelectScreen', () => {
  test('should display the select screen', () => {
    const { getByTestId } = render(<AuthNavigator />, {
      wrapper: renderWithMainProviders,
    })

    // Should display the logo
    const logo = getByTestId('logo')
    expect(logo).toBeTruthy()

    // When click on firstName we are redirect to the first page of the form
    fireEvent.press(getByTestId('tapYourFirstnameButton'))
    expect(getByTestId('firstNameForm')).toBeTruthy()
  })
})
