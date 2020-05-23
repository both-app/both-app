import { omitBy } from '../utils'

describe('omitBy', () => {
  test('should omit keys', () => {
    const result = omitBy({ key1: 1, key2: 2 }, ['key2'])

    expect(result).toEqual({ key1: 1 })
  })
})
