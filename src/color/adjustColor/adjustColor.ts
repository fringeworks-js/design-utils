import type { AbsoluteColor, HexColor } from '@fringeworks/types';
import { formatColor, parseOklch } from '../../_internal/_color';
import type { AdjustColorOptions } from './types';

/**
 * 色の明るさ・彩度・色相を OKLCH で変える
 *
 * 各オプションの値を、OKLCH の値に足す。明るさは 0〜1、彩度は 0 以上に収め、色相は 0〜360 度で回す\
 * 結果が sRGB に収まらない場合は、CSS Color 4 の方法で彩度を下げて収める
 *
 * @param color 元の色
 * @param options
 * @returns 16進数の色。`color` を読み取れない場合は `undefined`
 */
export default function adjustColor(
  color: AbsoluteColor,
  options: AdjustColorOptions,
): HexColor | undefined {
  const { lightness = 0, chroma = 0, hue = 0 } = options;
  const parsed = parseOklch(color);
  if (parsed === undefined) {
    return undefined;
  }
  const c = Math.max(parsed.c + chroma, 0);
  // 無彩色（白・灰色など）は色相を持たない。彩度を足した場合は 0 度として扱う
  const h =
    parsed.h === undefined && c === 0
      ? undefined
      : ((((parsed.h ?? 0) + hue) % 360) + 360) % 360;
  return formatColor({
    ...parsed,
    l: Math.min(Math.max(parsed.l + lightness, 0), 1),
    c,
    h,
  });
}
