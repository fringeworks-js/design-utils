import adjustColor from './adjustColor';

const isGray = (hex: string | undefined) =>
  hex !== undefined &&
  hex.slice(1, 3) === hex.slice(3, 5) &&
  hex.slice(3, 5) === hex.slice(5, 7);

describe('adjustColor', () => {
  it('何も変えなければ元の色を16進数で返す', () => {
    expect(adjustColor('#2f6fde', {})).toBe('#2f6fde');
    expect(adjustColor('rgb(47 111 222)', {})).toBe('#2f6fde');
  });

  it('明るさを足す', () => {
    const darker = adjustColor('#2f6fde', { lightness: -0.1 });
    const lighter = adjustColor('#2f6fde', { lightness: 0.1 });
    expect(darker).toMatch(/^#[0-9a-f]{6}$/);
    expect(darker! < '#2f6fde').toBe(true);
    expect(lighter! > '#2f6fde').toBe(true);
  });

  it('明るさは 0〜1 に収める', () => {
    expect(adjustColor('#2f6fde', { lightness: 1 })).toBe('#ffffff');
    expect(adjustColor('#2f6fde', { lightness: -1 })).toBe('#000000');
  });

  it('彩度を下げきると灰色になる', () => {
    expect(isGray(adjustColor('#2f6fde', { chroma: -1 }))).toBe(true);
  });

  it('色相を回す', () => {
    expect(adjustColor('#2f6fde', { hue: 360 })).toBe('#2f6fde');
    expect(adjustColor('#2f6fde', { hue: -360 })).toBe('#2f6fde');
    expect(adjustColor('#2f6fde', { hue: 180 })).not.toBe('#2f6fde');
  });

  it('無彩色は色相を回しても変わらない', () => {
    expect(adjustColor('#808080', { hue: 120 })).toBe('#808080');
  });

  it('sRGB に収まらない色は収める', () => {
    expect(adjustColor('#2f6fde', { chroma: 0.3 })).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('透明度を保つ', () => {
    expect(adjustColor('rgb(0 0 0 / 50%)', { lightness: 1 })).toBe('#ffffff80');
  });

  it('undefined のオプションは指定しなかったものとして扱う', () => {
    expect(adjustColor('#2f6fde', { lightness: undefined })).toBe('#2f6fde');
  });

  it('読み取れない色は undefined', () => {
    expect(adjustColor('#zzz', { lightness: 0.1 })).toBeUndefined();
  });
});
