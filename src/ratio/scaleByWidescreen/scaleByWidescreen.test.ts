import scaleByWidescreen from './scaleByWidescreen';

const RATIO = 16 / 9;

describe('scaleByWidescreen', () => {
  it('ワイドスクリーンの比でexpandする', () => {
    expect(scaleByWidescreen(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink でワイドスクリーンの比で割る', () => {
    expect(scaleByWidescreen(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByWidescreen(1)).toBeCloseTo(RATIO, 2);
  });
});
