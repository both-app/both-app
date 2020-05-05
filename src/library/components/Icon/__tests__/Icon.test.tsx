import React from 'react'
import { render } from 'react-native-testing-library'

import { Icon, IconName } from '../'

describe('Icon', () => {
  const ICONS = [
    ['arrow_right'],
    ['chevron_left'],
    ['check'],
    ['plus'],
    ['award'],
    ['heart'],
    ['list'],
    ['close'],
    ['share'],
    ['camera'],
    ['rotate'],
    ['loader'],
    ['linkedin'],
    ['users'],
  ] as Array<[IconName]>

  test.each(ICONS)('should display the icon', (iconName) => {
    const { toJSON } = render(<Icon iconName={iconName} />)

    expect(toJSON()).toMatchSnapshot()
  })
})
