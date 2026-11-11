import type { ColorHarmony } from '../color/createHarmonyColors/types';

/**
 * 調和の関係ごとの、元の色からの色相の角度（度）。元の色（0°）を先頭に、角度の小さい順に並べる
 *
 * `createHarmonyColors` はすべての角度の色を返し、`createAccentColor` は 2 番目（正の向きの最初の角度）を使う
 */
export const harmonyAngles: Readonly<Record<ColorHarmony, readonly number[]>> =
  {
    analogous: [0, 30, 330],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210],
    triadic: [0, 120, 240],
    square: [0, 90, 180, 270],
  };

/**
 * OKLCH の色相を回す。無彩色（色相を持たない色）はそのまま
 * @param h 元の色相
 * @param degrees 回す角度（度）
 * @returns 0〜360 度の色相
 */
export function rotateHue(
  h: number | undefined,
  degrees: number,
): number | undefined {
  return h === undefined ? undefined : (((h + degrees) % 360) + 360) % 360;
}
