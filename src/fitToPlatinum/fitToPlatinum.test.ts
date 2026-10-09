import fitToPlatinum from './fitToPlatinum';

const RATIO = 1.324717957244746;

describe('fitToPlatinum', () => {
  it('白金比でexpandする', () => {
    expect(fitToPlatinum(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で白金比で割る', () => {
    expect(fitToPlatinum(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToPlatinum(1)).toBeCloseTo(RATIO, 2);
  });
});
