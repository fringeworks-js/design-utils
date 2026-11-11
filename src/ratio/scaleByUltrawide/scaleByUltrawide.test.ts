import scaleByUltrawide from './scaleByUltrawide';

const RATIO = 21 / 9;

describe('scaleByUltrawide', () => {
  it('ウルトラワイドの比でexpandする', () => {
    expect(scaleByUltrawide(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink でウルトラワイドの比で割る', () => {
    expect(scaleByUltrawide(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByUltrawide(1)).toBeCloseTo(RATIO, 2);
  });
});
