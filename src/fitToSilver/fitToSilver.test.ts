import fitToSilver from './fitToSilver';

const RATIO = 1 + Math.sqrt(2);

describe('fitToSilver', () => {
  it('白銀比でexpandする', () => {
    expect(fitToSilver(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で白銀比で割る', () => {
    expect(fitToSilver(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToSilver(1)).toBeCloseTo(RATIO, 2);
  });
});
