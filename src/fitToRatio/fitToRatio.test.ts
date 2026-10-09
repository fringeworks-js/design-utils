import fitToRatio from './fitToRatio';

describe('fitToRatio', () => {
  describe('mode: expand (デフォルト)', () => {
    it('値に比率を掛ける', () => {
      expect(fitToRatio(100, 2)).toBe(200);
    });

    it('小数点3桁で丸める', () => {
      expect(fitToRatio(100, 1.618)).toBe(161.8);
    });
  });

  describe('mode: shrink', () => {
    it('値を比率で割る', () => {
      expect(fitToRatio(100, 2, { mode: 'shrink' })).toBe(50);
    });
  });

  describe('decimals オプション', () => {
    it('小数点桁数を指定', () => {
      expect(fitToRatio(100, 1.618, { decimals: 1 })).toBe(161.8);
    });

    it('decimals=0 で整数に丸める', () => {
      expect(fitToRatio(100, 1.618, { decimals: 0 })).toBe(162);
    });
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(fitToRatio.dataLast(2)(100)).toBe(200);
    });
  });
});
