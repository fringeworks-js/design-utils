import scaleBySqrt3 from './scaleBySqrt3';

const RATIO = Math.sqrt(3);

describe('scaleBySqrt3', () => {
  it('√3比でexpandする', () => {
    expect(scaleBySqrt3(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で√3比で割る', () => {
    expect(scaleBySqrt3(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleBySqrt3(1)).toBeCloseTo(RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleBySqrt3.dataLast())).toEqual([scaleBySqrt3(100)]);
      expect(scaleBySqrt3.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleBySqrt3(100, { mode: 'shrink' }),
      );
    });
  });
});
