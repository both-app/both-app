import React from 'react'
import { render, fireEvent, waitForElement } from 'react-native-testing-library'
import * as Haptics from 'expo-haptics'

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
    const impactAsyncMock = jest.spyOn(Haptics, 'impactAsync')

    const { getByTestId } = render(
      <MinimalButton iconName="arrow_right" onAction={handleOnActionMock} />
    )

    fireEvent.press(getByTestId('minimalButton'))

    await waitForElement(() => expect(handleOnActionMock).toHaveBeenCalled())

    expect(impactAsyncMock).toHaveBeenCalled()
  })
})
