import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'

import { MinimalButton } from '../'

describe('MinimalButton', () => {
  const handleOnActionMock = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should display the button', () => {
    const { toJSON } = render(
      <MinimalButton iconName="arrow_right" onAction={handleOnActionMock} />
    )

    expect(toJSON()).toMatchSnapshot()
  })

  test('should have an haptics return', async () => {
    const { getByTestId } = render(
      <MinimalButton iconName="arrow_right" onAction={handleOnActionMock} />
    )

    fireEvent.press(getByTestId('minimalButton'))

    expect(handleOnActionMock).toHaveBeenCalled()
  })
})
