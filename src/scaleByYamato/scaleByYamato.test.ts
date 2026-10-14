import scaleByYamato from './scaleByYamato';

const RATIO = Math.sqrt(2);

describe('scaleByYamato', () => {
  it('大和比(√2)でexpandする', () => {
    expect(scaleByYamato(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で大和比で割る', () => {
    expect(scaleByYamato(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleByYamato(1)).toBeCloseTo(RATIO, 2);
  });
});
