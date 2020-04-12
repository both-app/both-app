import { isValidDate } from '../date'

describe('isValidDate', () => {
  describe('should return true', () => {
    const GOOD_DATES = [['1993', '7', '21']]
    test.each(GOOD_DATES)('.isValidDate(%i, %i, %i)', (year, month, day) => {
      // @ts-ignore
      expect(isValidDate(year, month, day)).toBe(true)
    })
  })

  describe('should return false', () => {
    const WRONG_DATES = [
      ['99997', '21', '99'],
      ['9999', '99', '99'],
    ]
    test.each(WRONG_DATES)('.isValidDate(%i, %i, %i)', (year, month, day) => {
      // @ts-ignore
      expect(isValidDate(year, month, day)).toBe(false)
    })
  })
})
