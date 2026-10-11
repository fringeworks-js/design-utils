import scaleByPlatinum from './scaleByPlatinum';

const RATIO = 1.324717957244746;

describe('scaleByPlatinum', () => {
  it('白金比でexpandする', () => {
    expect(scaleByPlatinum(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で白金比で割る', () => {
    expect(scaleByPlatinum(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByPlatinum(1)).toBeCloseTo(RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleByPlatinum.dataLast())).toEqual([
        scaleByPlatinum(100),
      ]);
      expect(scaleByPlatinum.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleByPlatinum(100, { mode: 'shrink' }),
      );
    });
  });
});
