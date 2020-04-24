import React from 'react'
import { render } from 'react-native-testing-library'
import * as Haptics from 'expo-haptics'

import { Info } from '../'

describe('Info', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should display the component with the texts and the right color', () => {
    const { toJSON } = render(
      <Info primary="title" secondary="subtitle" color="white" />
    )

    expect(toJSON()).toMatchSnapshot()
  })

  test('should have an haptic feedback when the props hide change', () => {
    const notificationAsyncMock = jest.spyOn(Haptics, 'notificationAsync')

    const props = {
      primary: 'title',
      secondary: 'subtitle',
      color: 'white',
      withHapticFeedback: true,
    }

    // @ts-ignore
    const { update } = render(<Info {...props} hide={true} />)
    // @ts-ignore
    update(<Info {...props} hide={false} />)

    expect(notificationAsyncMock).toHaveBeenCalled()
  })
})
