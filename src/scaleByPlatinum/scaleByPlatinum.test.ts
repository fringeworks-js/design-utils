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
});
