import type { AbsoluteColor, HexColor } from '@fringeworks/types';
import { formatColor, parseColor } from '../_internal/_color';

/**
 * 色の透明度を、指定した値に置き換える
 *
 * @param color 元の色
 * @param alpha 透明度。0（透明）〜1（不透明）に収める
 * @returns 16進数の色。`color` を読み取れない場合は `undefined`
 */
export default function changeAlpha(
  color: AbsoluteColor,
  alpha: number,
): HexColor | undefined {
  const parsed = parseColor(color);
  if (parsed === undefined) {
    return undefined;
  }
  return formatColor({ ...parsed, alpha: Math.min(Math.max(alpha, 0), 1) });
}
