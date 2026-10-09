import appendUnit from './appendUnit';

describe('appendUnit', () => {
  it('数値にデフォルト単位（px）を付与する', () => {
    expect(appendUnit(10)).toBe('10px');
  });

  it('数値に指定した単位を付与する', () => {
    expect(appendUnit(10, 'rem')).toBe('10rem');
  });

  it('0に単位を付与する', () => {
    expect(appendUnit(0)).toBe('0px');
  });

  it('負の数値に単位を付与する', () => {
    expect(appendUnit(-5, 'em')).toBe('-5em');
  });

  it('小数に単位を付与する', () => {
    expect(appendUnit(1.5, '%')).toBe('1.5%');
  });

  it('文字列はそのまま返す', () => {
    expect(appendUnit('10px')).toBe('10px');
  });

  it('空文字はそのまま返す', () => {
    expect(appendUnit('')).toBe('');
  });

  it('nullはそのまま返す', () => {
    expect(appendUnit(null)).toBeNull();
  });

  it('undefinedはそのまま返す', () => {
    expect(appendUnit(undefined)).toBeUndefined();
  });
});
