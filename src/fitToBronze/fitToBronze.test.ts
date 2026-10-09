import fitToBronze from './fitToBronze';

const RATIO = (3 + Math.sqrt(13)) / 2;

describe('fitToBronze', () => {
  it('青銅比でexpandする', () => {
    expect(fitToBronze(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で青銅比で割る', () => {
    expect(fitToBronze(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(fitToBronze(1)).toBeCloseTo(RATIO, 2);
  });
});
