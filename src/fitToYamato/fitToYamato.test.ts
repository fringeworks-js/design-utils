import fitToYamato from './fitToYamato';

const RATIO = Math.sqrt(2);

describe('fitToYamato', () => {
  it('大和比(√2)でexpandする', () => {
    expect(fitToYamato(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で大和比で割る', () => {
    expect(fitToYamato(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToYamato(1)).toBeCloseTo(RATIO, 2);
  });
});
