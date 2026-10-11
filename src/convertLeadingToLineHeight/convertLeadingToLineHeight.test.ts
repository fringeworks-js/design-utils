import convertLeadingToLineHeight from './convertLeadingToLineHeight';

describe('convertLeadingToLineHeight', () => {
  it('行送りを文字サイズで割る', () => {
    expect(convertLeadingToLineHeight(24, 16)).toBe(1.5);
  });

  it('小数点3桁で丸める', () => {
    expect(convertLeadingToLineHeight(20, 13)).toBe(1.538);
    expect(convertLeadingToLineHeight(20, 13, { decimals: 1 })).toBe(1.5);
  });
});
