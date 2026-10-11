import scaleByHarmonic from './scaleByHarmonic';

const RATIO = 4 / 3;

describe('scaleByHarmonic', () => {
  it('調和比でexpandする', () => {
    expect(scaleByHarmonic(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で調和比で割る', () => {
    expect(scaleByHarmonic(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByHarmonic(1)).toBeCloseTo(RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleByHarmonic.dataLast())).toEqual([
        scaleByHarmonic(100),
      ]);
      expect(scaleByHarmonic.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleByHarmonic(100, { mode: 'shrink' }),
      );
    });
  });
});
