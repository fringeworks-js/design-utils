import fitToSqrt5 from './fitToSqrt5';

const RATIO = Math.sqrt(5);

describe('fitToSqrt5', () => {
  it('√5比でexpandする', () => {
    expect(fitToSqrt5(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で√5比で割る', () => {
    expect(fitToSqrt5(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToSqrt5(1)).toBeCloseTo(RATIO, 2);
  });
});
