import mixColors from './mixColors';

describe('mixColors', () => {
  it('ratio は 1つ目の色の割合', () => {
    expect(mixColors('#2f6fde', '#ffffff', 1)).toBe('#2f6fde');
    expect(mixColors('#2f6fde', '#ffffff', 0)).toBe('#ffffff');
  });

  it('CSS の color-mix(in oklch, …) と同じ結果になる', () => {
    // color-mix(in oklch, white 50%, black) は rgb(99 99 99)
    expect(mixColors('#ffffff', '#000000', 0.5)).toBe('#636363');
  });

  it('色相を持たない色と混ぜても色味がずれない', () => {
    // 白の色相を 0 度として混ぜると、青に赤みが出る
    expect(mixColors('#2f6fde', '#ffffff', 0.2)).toBe('#d5e3fb');
  });

  it('透明な色と混ぜると、色を保って透明度だけが変わる', () => {
    expect(mixColors('#2f6fde', 'transparent', 0.5)).toBe('#2f6fde80');
  });

  it('ratio は 0〜1 に収める', () => {
    expect(mixColors('#2f6fde', '#ffffff', 2)).toBe('#2f6fde');
    expect(mixColors('#2f6fde', '#ffffff', -1)).toBe('#ffffff');
  });

  it('どちらかの色を読み取れない場合は undefined', () => {
    expect(mixColors('#zzz', '#ffffff', 0.5)).toBeUndefined();
    expect(mixColors('#ffffff', '#zzz', 0.5)).toBeUndefined();
  });
});
