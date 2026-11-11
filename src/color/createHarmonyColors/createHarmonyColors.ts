import type { AbsoluteColor, HexColor } from '@fringeworks/types';
import { formatColor, parseOklch } from '../../_internal/_color';
import { harmonyAngles, rotateHue } from '../../_internal/_harmonyAngles';
import type { CreateHarmonyColorsOptions } from './types';

/**
 * 色相環の上で調和の関係にある色を、OKLCH で色相を回して作る
 *
 * 元の色を先頭に、元の色からの角度の小さい順に並べる。明るさと彩度は元の色のままにする
 * （sRGB に収まらない場合は、CSS Color 4 の方法で彩度を下げて収める）。
 * 無彩色（白・灰色など）は色相を持たないので、同じ色が並ぶ。
 *
 * @param color 元の色
 * @param options
 * @returns 16進数の色の配列。`color` を読み取れない場合は `undefined`
 */
export default function createHarmonyColors(
  color: AbsoluteColor,
  options: CreateHarmonyColorsOptions = {},
): HexColor[] | undefined {
  const { harmony = 'triadic' } = options;
  const parsed = parseOklch(color);
  if (parsed === undefined) {
    return undefined;
  }
  return harmonyAngles[harmony].map((degrees) =>
    formatColor({ ...parsed, h: rotateHue(parsed.h, degrees) }),
  );
}
