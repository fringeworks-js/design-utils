import type { AbsoluteColor, HexColor } from '@fringeworks/types';
import { interpolateWithPremultipliedAlpha, type Oklch } from 'culori/fn';
import { formatColor, parseOklch } from '../_internal/_color';

/**
 * 2つの色を OKLCH で混ぜる
 *
 * CSS の `color-mix(in oklch, color <ratio>, other)` と同じ結果になる（`ratio` は `color` の割合）\
 * 透明度は CSS と同じく、色に掛けた値（premultiplied）で混ぜる
 *
 * @param color 1つ目の色
 * @param other 2つ目の色
 * @param ratio `color` の割合。0（`other` だけ）〜1（`color` だけ）に収める
 * @returns 16進数の色。どちらかの色を読み取れない場合は `undefined`
 */
export default function mixColors(
  color: AbsoluteColor,
  other: AbsoluteColor,
  ratio: number,
): HexColor | undefined {
  const first = parseOklch(color);
  const second = parseOklch(other);
  if (first === undefined || second === undefined) {
    return undefined;
  }
  const mix = interpolateWithPremultipliedAlpha(
    [fillHue(first, second), fillHue(second, first)],
    'oklch',
  );
  return formatColor(mix(1 - Math.min(Math.max(ratio, 0), 1)));
}

/**
 * 色相を持たない色（白・灰色など）に、相手の色相を補う\
 * CSS の「欠けた値は相手の値を使う」と同じにするため。補わないと 0 度として混ざり、色味がずれる
 */
function fillHue(color: Oklch, other: Oklch): Oklch {
  return { ...color, h: color.h ?? other.h ?? 0 };
}
