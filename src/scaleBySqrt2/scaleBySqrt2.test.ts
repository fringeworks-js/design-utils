import scaleBySqrt2 from './scaleBySqrt2';

const RATIO = Math.sqrt(2);

describe('scaleBySqrt2', () => {
  it('√2比でexpandする', () => {
    expect(scaleBySqrt2(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で√2比で割る', () => {
    expect(scaleBySqrt2(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleBySqrt2(1)).toBeCloseTo(RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleBySqrt2.dataLast())).toEqual([scaleBySqrt2(100)]);
      expect(scaleBySqrt2.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleBySqrt2(100, { mode: 'shrink' }),
      );
    });
  });
});
