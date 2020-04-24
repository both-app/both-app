import React from 'react'
import { render } from 'react-native-testing-library'

import { Badge } from '../'

describe('Badge', () => {
  test('should display a badge with a color', () => {
    const { toJSON } = render(<Badge color="dark200">basic text</Badge>)

    expect(toJSON()).toMatchSnapshot()
  })
})
