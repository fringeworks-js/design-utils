import fitToSqrt3 from './fitToSqrt3';

const RATIO = Math.sqrt(3);

describe('fitToSqrt3', () => {
  it('√3比でexpandする', () => {
    expect(fitToSqrt3(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で√3比で割る', () => {
    expect(fitToSqrt3(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToSqrt3(1)).toBeCloseTo(RATIO, 2);
  });
});
