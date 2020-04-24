import React from 'react'
import { render } from 'react-native-testing-library'

import { Label } from '../'

describe('Label', () => {
  test('should display the label', () => {
    const { toJSON } = render(
      <Label primary="primary text" secondary="secondary text" />
    )

    expect(toJSON()).toMatchSnapshot()
  })

  test('should not display the secondary text', () => {
    const { toJSON } = render(<Label primary="primary text" />)

    expect(toJSON()).toMatchSnapshot()
  })
})
