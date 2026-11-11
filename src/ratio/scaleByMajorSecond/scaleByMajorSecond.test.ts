import scaleByMajorSecond from './scaleByMajorSecond';

const RATIO = 9 / 8;

describe('scaleByMajorSecond', () => {
  it('長2度の比でexpandする', () => {
    expect(scaleByMajorSecond(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で長2度の比で割る', () => {
    expect(scaleByMajorSecond(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByMajorSecond(1)).toBeCloseTo(RATIO, 2);
  });
});
