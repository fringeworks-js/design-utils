import scaleBySilver from './scaleBySilver';

const RATIO = 1 + Math.sqrt(2);

describe('scaleBySilver', () => {
  it('白銀比でexpandする', () => {
    expect(scaleBySilver(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で白銀比で割る', () => {
    expect(scaleBySilver(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleBySilver(1)).toBeCloseTo(RATIO, 2);
  });
});
