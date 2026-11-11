import calculateContrastRatio from './calculateContrastRatio';

describe('calculateContrastRatio', () => {
  it('WCAG 2 のコントラスト比を返す', () => {
    expect(calculateContrastRatio('#ffffff', '#000000')).toBe(21);
    expect(calculateContrastRatio('#000000', '#ffffff')).toBe(21);
    expect(calculateContrastRatio('red', 'red')).toBe(1);
    expect(calculateContrastRatio('#2f6fde', '#ffffff')).toBe(4.72);
  });

  it('小数点以下の桁数', () => {
    expect(calculateContrastRatio('#2f6fde', '#ffffff', { decimals: 1 })).toBe(
      4.7,
    );
  });

  it('どちらかの色を読み取れない場合は undefined', () => {
    expect(calculateContrastRatio('#zzz', '#ffffff')).toBeUndefined();
    expect(calculateContrastRatio('#ffffff', '#zzz')).toBeUndefined();
  });
});
