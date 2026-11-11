import changeAlpha from './changeAlpha';

describe('changeAlpha', () => {
  it('透明度を置き換える', () => {
    expect(changeAlpha('#2f6fde', 0.5)).toBe('#2f6fde80');
    expect(changeAlpha('rgb(47 111 222 / 0.2)', 0.5)).toBe('#2f6fde80');
  });

  it('透明度が 1 なら #rrggbb で返す', () => {
    expect(changeAlpha('rgb(47 111 222 / 0.2)', 1)).toBe('#2f6fde');
  });

  it('透明度は 0〜1 に収める', () => {
    expect(changeAlpha('#2f6fde', 2)).toBe('#2f6fde');
    expect(changeAlpha('#2f6fde', -1)).toBe('#2f6fde00');
  });

  it('読み取れない色は undefined', () => {
    expect(changeAlpha('#zzz', 0.5)).toBeUndefined();
  });
});
