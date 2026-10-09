import fitToHarmonic from './fitToHarmonic';

const RATIO = 4 / 3;

describe('fitToHarmonic', () => {
  it('調和比でexpandする', () => {
    expect(fitToHarmonic(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で調和比で割る', () => {
    expect(fitToHarmonic(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToHarmonic(1)).toBeCloseTo(RATIO, 2);
  });
});
