import scaleBySqrt3 from './scaleBySqrt3';

const RATIO = Math.sqrt(3);

describe('scaleBySqrt3', () => {
  it('√3比でexpandする', () => {
    expect(scaleBySqrt3(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で√3比で割る', () => {
    expect(scaleBySqrt3(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleBySqrt3(1)).toBeCloseTo(RATIO, 2);
  });
});
