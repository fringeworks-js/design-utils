import { convertUnit } from '../convertUnit';
import convertLeadingToLineHeight from './convertLeadingToLineHeight';

describe('convertLeadingToLineHeight', () => {
  it('行送りを文字サイズで割る', () => {
    expect(convertLeadingToLineHeight(24, 16)).toBe(1.5);
  });

  it('小数点3桁で丸める', () => {
    expect(convertLeadingToLineHeight(20, 13)).toBe(1.538);
    expect(convertLeadingToLineHeight(20, 13, { decimals: 1 })).toBe(1.5);
  });

  it('行送りが文字サイズより小さい場合は 1 未満', () => {
    expect(convertLeadingToLineHeight(12, 16)).toBe(0.75);
  });

  it('単位が異なる場合は convertUnit で揃える', () => {
    // 行送り 18pt、文字サイズ 16px
    expect(convertLeadingToLineHeight(convertUnit(18, 'pt', 'px'), 16)).toBe(
      1.5,
    );
  });
});
