import calculateContrastRatio from '../calculateContrastRatio';
import ensureContrast from './ensureContrast';

describe('ensureContrast', () => {
  it('すでに届いている場合は元の色を返す', () => {
    expect(ensureContrast('#2f6fde', '#ffffff', 3)).toBe('#2f6fde');
    expect(ensureContrast('rgb(47 111 222)', '#ffffff', 3)).toBe('#2f6fde');
  });

  it('明るい背景に対しては暗くして届かせる', () => {
    const result = ensureContrast('#ffeb3b', '#ffffff', 3);
    expect(result).toBeDefined();
    expect(calculateContrastRatio(result!, '#ffffff')).toBeGreaterThanOrEqual(
      3,
    );
    // 届く中で最も元の色に近い（ぎりぎり届く）
    expect(calculateContrastRatio(result!, '#ffffff')).toBeLessThan(3.1);
  });

  it('暗い背景に対しては明るくして届かせる', () => {
    const result = ensureContrast('#1a237e', '#000000', 4.5);
    expect(calculateContrastRatio(result!, '#000000')).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  it('白・黒まで変えても届かない場合は、白・黒まで変えた色を返す', () => {
    expect(ensureContrast('#808080', '#ffffff', 30)).toBe('#000000');
  });

  it('どちらかの色を読み取れない場合は undefined', () => {
    expect(ensureContrast('#zzz', '#ffffff', 3)).toBeUndefined();
    expect(ensureContrast('#2f6fde', '#zzz', 3)).toBeUndefined();
  });
});
