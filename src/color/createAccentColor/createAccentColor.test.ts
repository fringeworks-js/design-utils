import { parseOklch } from '../../_internal/_color';
import calculateContrastRatio from '../calculateContrastRatio';
import chooseReadableColor from '../chooseReadableColor';
import createAccentColor from './createAccentColor';

/** 元の色からの色相の差（−180〜180） */
function hueShift(from: string, to: string): number {
  const a = parseOklch(from)!.h!;
  const b = parseOklch(to)!.h!;
  return ((((b - a + 180) % 360) + 360) % 360) - 180;
}

const lightnessOf = (color: string) => parseOklch(color)!.l;

describe('createAccentColor', () => {
  describe("emphasis: 'strong'（既定）", () => {
    it('色相を 60° 回し、元の色より濃くして、白とのコントラスト比 4.5 以上にする', () => {
      const result = createAccentColor('#2563eb')!;
      expect(hueShift('#2563eb', result)).toBeCloseTo(60, -1);
      expect(lightnessOf(result)).toBeLessThan(lightnessOf('#2563eb') - 0.04);
      expect(calculateContrastRatio(result, '#ffffff')).toBeGreaterThanOrEqual(
        4.5,
      );
    });

    it('明るい色は、背景とのコントラスト比 4.5 まで濃くする', () => {
      const result = createAccentColor('#facc15')!;
      const ratio = calculateContrastRatio(result, '#ffffff')!;
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(ratio).toBeLessThan(4.6);
    });

    it('すでに十分濃い色（背景との比が 8 以上）は、背景に近づけて淡くする', () => {
      const result = createAccentColor('#1e3a8a')!;
      expect(lightnessOf(result)).toBeGreaterThan(
        lightnessOf('#1e3a8a') + 0.04,
      );
      expect(calculateContrastRatio(result, '#ffffff')).toBeGreaterThanOrEqual(
        4.5,
      );
    });

    it('暗い背景では、背景から遠ざけて明るくする', () => {
      const result = createAccentColor('#2563eb', { background: '#121212' })!;
      expect(lightnessOf(result)).toBeGreaterThan(lightnessOf('#2563eb'));
      expect(calculateContrastRatio(result, '#121212')).toBeGreaterThanOrEqual(
        4.5,
      );
    });

    it('元の色の側で比 4.5 に届かない場合は、背景の反対の側に置く', () => {
      const onWhite = createAccentColor('#ffffff')!;
      expect(calculateContrastRatio(onWhite, '#ffffff')).toBeGreaterThanOrEqual(
        4.5,
      );
      const onBlack = createAccentColor('#000000', { background: '#000000' })!;
      expect(calculateContrastRatio(onBlack, '#000000')).toBeGreaterThanOrEqual(
        4.5,
      );
    });

    it('無彩色は、明るさだけが違う無彩色になる', () => {
      const result = createAccentColor('#808080')!;
      expect(parseOklch(result)!.c).toBeLessThan(0.001);
      expect(calculateContrastRatio(result, '#ffffff')).toBeGreaterThanOrEqual(
        4.5,
      );
    });
  });

  describe('hue', () => {
    it('数値は回す角度', () => {
      const result = createAccentColor('#7f8fa8', { hue: 120 })!;
      expect(hueShift('#7f8fa8', result)).toBeCloseTo(120, -1);
    });

    it.each([
      ['analogous', 30],
      ['square', 90],
      ['triadic', 120],
      ['splitComplementary', 150],
      ['complementary', 180],
    ] as const)('%s は %d°', (hue, angle) => {
      const result = createAccentColor('#7f8fa8', { hue })!;
      // 180° は −180° として測れることがある
      expect(Math.abs(hueShift('#7f8fa8', result))).toBeCloseTo(angle, -1);
    });

    it('undefined なら既定の 60°', () => {
      expect(createAccentColor('#2563eb', { hue: undefined })).toBe(
        createAccentColor('#2563eb'),
      );
    });
  });

  describe("emphasis: 'subtle'", () => {
    it('明るい背景では、背景とのコントラスト比 1.1 の面の色にする', () => {
      const result = createAccentColor('#2563eb', { emphasis: 'subtle' })!;
      expect(calculateContrastRatio(result, '#ffffff')).toBeCloseTo(1.1, 1);
      expect(lightnessOf(result)).toBeLessThan(1);
      expect(hueShift('#2563eb', result)).toBeCloseTo(60, -1);
    });

    it('暗い背景では、背景とのコントラスト比 1.3 の面の色にする', () => {
      const result = createAccentColor('#60a5fa', {
        emphasis: 'subtle',
        background: '#121212',
      })!;
      expect(calculateContrastRatio(result, '#121212')).toBeCloseTo(1.3, 1);
      expect(lightnessOf(result)).toBeGreaterThan(lightnessOf('#121212'));
    });

    it('白と黒の読みやすい方の文字は、面の上で読める', () => {
      for (const background of ['#ffffff', '#121212'] as const) {
        const surface = createAccentColor('#2563eb', {
          emphasis: 'subtle',
          background,
        })!;
        const text = chooseReadableColor(surface)!;
        expect(calculateContrastRatio(text, surface)).toBeGreaterThanOrEqual(
          4.5,
        );
      }
    });
  });

  it('emphasis・background が undefined なら既定の値', () => {
    expect(
      createAccentColor('#2563eb', {
        emphasis: undefined,
        background: undefined,
      }),
    ).toBe(createAccentColor('#2563eb'));
  });

  it('色を読み取れない場合は undefined', () => {
    expect(createAccentColor('#zzz')).toBeUndefined();
    expect(
      createAccentColor('#2563eb', { background: '#zzz' }),
    ).toBeUndefined();
  });
});
