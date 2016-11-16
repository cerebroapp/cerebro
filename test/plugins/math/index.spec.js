import math from '../../../main/plugins/math';
import assert from 'assert';

describe('Math plugin', () => {
  it('callback called with correct object', (done) => {
    math.fn('5 + 6', (result) => {
      assert(result.icon === '/Applications/Calculator.app');
      assert(result.clipboard === '11');
      assert(result.title === '= 11');
      assert(result.term === '5 + 6 = 11');
      done();
    });
  });

  it('formats infinity', (done) => {
    math.fn('1 / 0', (result) => {
      assert(result.clipboard === '∞');
      assert(result.title === '= ∞');
      assert(result.term === '1 / 0 = ∞');
      done();
    });
  });

  it('shows indeterminate', (done) => {
    math.fn('0 / 0', (result) => {
      assert(result.title === '= indeterminate');
      assert(!!result.getPreview);
      done();
    });
  });

  context('calculates with complex expressions: ', () => {
    it(' :several operations', (done) => {
      math.fn('5 * 6 - 10', (result) => {
        assert(result.title === '= 20');
        done();
      });
    });

    it('brackets', (done) => {
      math.fn('5 * (6 - 10)', (result) => {
        assert(result.title === '= -20');
        done();
      });
    });

    it('floats', (done) => {
      math.fn('1.1 + 3.2', (result) => {
        assert(result.title === '= 4.3');
        done();
      });
    });

    it('floats with commas', (done) => {
      math.fn('1,1 + 3,2', (result) => {
        assert(result.title === '= 4.3');
        done();
      });
    });

    it('negatives', (done) => {
      math.fn('-10 + 60', (result) => {
        assert(result.title === '= 50');
        done();
      });
    });
  });
});
