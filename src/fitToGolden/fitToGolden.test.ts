import fitToGolden from './fitToGolden';

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2; // ≈ 1.618

describe('fitToGolden', () => {
  it('黄金比でexpandする', () => {
    const result = fitToGolden(100);
    expect(result).toBeCloseTo(100 * GOLDEN_RATIO, 2);
  });

  it('mode: shrink で黄金比で割る', () => {
    const result = fitToGolden(100, { mode: 'shrink' });
    expect(result).toBeCloseTo(100 / GOLDEN_RATIO, 2);
  });

  it('1の場合', () => {
    const result = fitToGolden(1);
    expect(result).toBeCloseTo(GOLDEN_RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(fitToGolden.dataLast()(100)).toBeCloseTo(100 * GOLDEN_RATIO, 2);
    });
  });
});
