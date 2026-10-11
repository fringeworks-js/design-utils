import scaleBySilver from './scaleBySilver';

const RATIO = 1 + Math.sqrt(2);

describe('scaleBySilver', () => {
  it('白銀比でexpandする', () => {
    expect(scaleBySilver(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で白銀比で割る', () => {
    expect(scaleBySilver(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleBySilver(1)).toBeCloseTo(RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleBySilver.dataLast())).toEqual([scaleBySilver(100)]);
      expect(scaleBySilver.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleBySilver(100, { mode: 'shrink' }),
      );
    });
  });
});
