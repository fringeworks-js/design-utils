import scaleBySqrt5 from './scaleBySqrt5';

const RATIO = Math.sqrt(5);

describe('scaleBySqrt5', () => {
  it('√5比でexpandする', () => {
    expect(scaleBySqrt5(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で√5比で割る', () => {
    expect(scaleBySqrt5(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleBySqrt5(1)).toBeCloseTo(RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleBySqrt5.dataLast())).toEqual([scaleBySqrt5(100)]);
      expect(scaleBySqrt5.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleBySqrt5(100, { mode: 'shrink' }),
      );
    });
  });
});
