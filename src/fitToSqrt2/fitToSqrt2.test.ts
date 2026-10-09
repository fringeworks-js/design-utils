import fitToSqrt2 from './fitToSqrt2';

const RATIO = Math.sqrt(2);

describe('fitToSqrt2', () => {
  it('√2比でexpandする', () => {
    expect(fitToSqrt2(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で√2比で割る', () => {
    expect(fitToSqrt2(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToSqrt2(1)).toBeCloseTo(RATIO, 2);
  });
});
