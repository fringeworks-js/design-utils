import scaleByMajorThird from './scaleByMajorThird';

const RATIO = 5 / 4;

describe('scaleByMajorThird', () => {
  it('長3度の比でexpandする', () => {
    expect(scaleByMajorThird(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で長3度の比で割る', () => {
    expect(scaleByMajorThird(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByMajorThird(1)).toBeCloseTo(RATIO, 2);
  });
});
