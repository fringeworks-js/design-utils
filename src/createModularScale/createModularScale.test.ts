import { GOLDEN_RATIO, HARMONIC_RATIO } from '../scaleByRatio';
import createModularScale from './createModularScale';

describe('createModularScale', () => {
  it('デフォルトは 16 と黄金比', () => {
    const scale = createModularScale();
    expect(scale(0)).toBe(16);
    expect(scale(1)).toBe(25.889);
    expect(scale(-1)).toBe(9.889);
  });

  it('比率を指定する', () => {
    const scale = createModularScale({ ratio: HARMONIC_RATIO });
    expect(scale(2)).toBe(28.444);
    expect(scale(-1)).toBe(12);
  });

  it('decimals', () => {
    const scale = createModularScale({ decimals: 0 });
    expect(scale(1)).toBe(26);
  });

  describe('base が配列', () => {
    it('基準値を組み合わせて小さい順に段階を振る', () => {
      const scale = createModularScale({ base: [16, 24], ratio: 2 });
      expect([-2, -1, 0, 1, 2, 3, 4].map(scale)).toEqual([
        8, 12, 16, 24, 32, 48, 64,
      ]);
    });

    it('2つ目以降の基準値は範囲に移す', () => {
      // 100 は 25 として扱う
      const scale = createModularScale({ base: [16, 100], ratio: 2 });
      expect([0, 1, 2, 3].map(scale)).toEqual([16, 25, 32, 50]);
    });

    it('同じ段階になる基準値はまとめる', () => {
      const scale = createModularScale({ base: [16, 32], ratio: 2 });
      expect([0, 1].map(scale)).toEqual([16, 32]);
    });

    it('デフォルトの比率でも動作する', () => {
      const scale = createModularScale({ base: [16, 18] });
      expect(scale(1)).toBe(18);
      expect(scale(2)).toBe(Number((16 * GOLDEN_RATIO).toFixed(3)));
    });

    it('比率が 1 以下ならエラー', () => {
      expect(() => createModularScale({ base: [16, 18], ratio: 1 })).toThrow(
        RangeError,
      );
    });
  });

  it('基準値が正の数でなければエラー', () => {
    expect(() => createModularScale({ base: 0 })).toThrow(RangeError);
    expect(() => createModularScale({ base: [] })).toThrow(RangeError);
  });
});
