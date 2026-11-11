import { parseOklch } from '../../_internal/_color';
import createHarmonyColors from './createHarmonyColors';

/** 元の色からの色相の差（0〜360） */
function hueOffset(from: string, to: string): number {
  const a = parseOklch(from)!.h!;
  const b = parseOklch(to)!.h!;
  return (((b - a) % 360) + 360) % 360;
}

describe('createHarmonyColors', () => {
  it('既定は三分割で、元の色を先頭に角度の小さい順に並べる', () => {
    const colors = createHarmonyColors('#2563eb')!;
    expect(colors).toHaveLength(3);
    expect(colors[0]).toBe('#2563eb');
    expect(hueOffset('#2563eb', colors[1]!)).toBeCloseTo(120, 0);
    expect(hueOffset('#2563eb', colors[2]!)).toBeCloseTo(240, 0);
  });

  it.each([
    ['analogous', [0, 30, 330]],
    ['complementary', [0, 180]],
    ['splitComplementary', [0, 150, 210]],
    ['triadic', [0, 120, 240]],
    ['square', [0, 90, 180, 270]],
  ] as const)('%s', (harmony, angles) => {
    // 色相を回しても sRGB に収まる、彩度の低い色で確かめる
    const colors = createHarmonyColors('#7f8fa8', { harmony })!;
    expect(colors).toHaveLength(angles.length);
    angles.forEach((angle, i) => {
      // 16進数に丸めるので、色相はわずかにずれる
      expect(Math.abs(hueOffset('#7f8fa8', colors[i]!) - angle)).toBeLessThan(
        2,
      );
    });
  });

  it('明るさは元の色のまま', () => {
    const l = parseOklch('#7f8fa8')!.l;
    for (const color of createHarmonyColors('#7f8fa8')!) {
      expect(parseOklch(color)!.l).toBeCloseTo(l, 2);
    }
  });

  it('harmony が undefined なら既定の三分割', () => {
    expect(createHarmonyColors('#2563eb', { harmony: undefined })).toEqual(
      createHarmonyColors('#2563eb'),
    );
  });

  it('無彩色は同じ色が並ぶ', () => {
    expect(createHarmonyColors('#808080')).toEqual([
      '#808080',
      '#808080',
      '#808080',
    ]);
  });

  it('色を読み取れない場合は undefined', () => {
    expect(createHarmonyColors('#zzz')).toBeUndefined();
  });
});
