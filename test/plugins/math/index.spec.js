import math from '../../../main/plugins/core/math'
import assert from 'assert'

describe('Math plugin', () => {
  it('callback called with correct object', (done) => {
    const term = '5 + 6'
    const display = (result) => {
      assert(result.icon === '/Applications/Calculator.app')
      assert(result.clipboard === '11')
      assert(result.title === '= 11')
      assert(result.term === '5 + 6 = 11')
      done()
    }
    math.fn({ term, display })
  })

  it('formats infinity', (done) => {
    const term = '1 / 0'
    const display = (result) => {
      assert(result.clipboard === '∞')
      assert(result.title === '= ∞')
      assert(result.term === '1 / 0 = ∞')
      done()
    }
    math.fn({ term, display })
  })

  it('shows indeterminate', (done) => {
    const term = '0 / 0'
    const display = (result) => {
      assert(result.title === '= indeterminate')
      assert(!!result.getPreview)
      done()
    }
    math.fn({ term, display })
  })

  context('calculates with complex expressions: ', () => {
    it(' :several operations', (done) => {
      const term = '5 * 6 - 10'
      const display = (result) => {
        assert(result.title === '= 20')
        done()
      }
      math.fn({ term, display })
    })

    it('brackets', (done) => {
      const term = '5 * (6 - 10)'
      const display = (result) => {
        assert(result.title === '= -20')
        done()
      }
      math.fn({ term, display })
    })

    it('floats', (done) => {
      const term = '1.1 + 3.2'
      const display = (result) => {
        assert(result.title === '= 4.3')
        done()
      }
      math.fn({ term, display })
    })

    it('floats with commas', (done) => {
      const term = '1,1 + 3,2'
      const display = (result) => {
        assert(result.title === '= 4.3')
        done()
      }
      math.fn({ term, display })
    })

    it('negatives', (done) => {
      const term = '-10 + 60'
      const display = (result) => {
        assert(result.title === '= 50')
        done()
      }
      math.fn({ term, display })
    })
  })
})
