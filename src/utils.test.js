import { getCurrentWord } from './utils'

describe('getCurrentWord', () => {
  it('can detect word position', () => {
    expect(getCurrentWord('abc #def ghi', 0)).toEqual('abc ')
    expect(getCurrentWord('abc #def ghi', 4)).toEqual(' #def ')
    expect(getCurrentWord('abc #def ghi', 12)).toEqual(' ghi')
  })
})


