import scaleByMinorThird from './scaleByMinorThird';

const RATIO = 6 / 5;

describe('scaleByMinorThird', () => {
  it('短3度の比でexpandする', () => {
    expect(scaleByMinorThird(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で短3度の比で割る', () => {
    expect(scaleByMinorThird(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByMinorThird(1)).toBeCloseTo(RATIO, 2);
  });
});
