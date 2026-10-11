import convertUnit from './convertUnit';

describe('convertUnit', () => {
  it('絶対単位を CSS の定義で変換する', () => {
    expect(convertUnit(1, 'in', 'px')).toBe(96);
    expect(convertUnit(72, 'pt', 'in')).toBe(1);
    expect(convertUnit(1, 'pc', 'pt')).toBe(12);
    expect(convertUnit(1, 'cm', 'mm')).toBe(10);
    expect(convertUnit(25.4, 'mm', 'px')).toBe(96);
  });

  it('Q は 1/4mm', () => {
    expect(convertUnit(4, 'Q', 'mm')).toBe(1);
    expect(convertUnit(13, 'Q', 'pt')).toBe(9.213);
  });

  it('rem と em は基準の文字サイズで変換する', () => {
    expect(convertUnit(24, 'px', 'rem')).toBe(1.5);
    expect(convertUnit(1, 'rem', 'px', { rootFontSize: 10 })).toBe(10);
    expect(convertUnit(1, 'em', 'px', { rootFontSize: 10 })).toBe(10);
    expect(convertUnit(2, 'em', 'rem', { fontSize: 20 })).toBe(2.5);
  });

  it('小数点3桁で丸める', () => {
    expect(convertUnit(1, 'px', 'mm')).toBe(0.265);
    expect(convertUnit(1, 'px', 'mm', { decimals: 5 })).toBe(0.26458);
  });

  it('dataLast', () => {
    expect([12, 24].map(convertUnit.dataLast('px', 'rem'))).toEqual([
      0.75, 1.5,
    ]);
  });
});
