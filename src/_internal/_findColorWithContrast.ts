import type { HexColor } from '@fringeworks/types';
import { wcagContrast, type Color, type Oklch } from 'culori/fn';
import { formatColor, parseColor } from './_color';

/**
 * 明るさを探す回数（明るさの差が 1/2^20 未満になるまで）
 */
const SEARCH_STEPS = 20;

/**
 * 背景より暗い側か、明るい側か
 */
export type Side = 'dark' | 'light';

/**
 * 色の明るさを変えた16進数の色を返す（明るさは 0〜1 に収める）
 * @param color
 * @param l
 * @returns
 */
export function formatWithLightness(color: Oklch, l: number): HexColor {
  return formatColor({ ...color, l: Math.min(Math.max(l, 0), 1) });
}

/**
 * 背景との WCAG 2 のコントラスト比を返す
 * @param color
 * @param background
 * @returns
 */
export function contrastWith(color: HexColor, background: Color): number {
  return wcagContrast(parseColor(color)!, background);
}

/**
 * 背景との WCAG 2 のコントラスト比が `target` になるように、色の明るさを OKLCH で変える
 *
 * 背景の `side` の側（背景より暗い側・明るい側）だけを探し、比が `target` 以上になる中で最も背景に近い明るさにする。
 * その側の端（黒・白）まで変えても届かない場合は、端まで変えた色を返す。彩度と色相はそのままにする
 * （sRGB に収まらない場合は、CSS Color 4 の方法で彩度を下げて収める）。
 *
 * @param color 元の色
 * @param background 背景の色
 * @param backgroundL 背景の OKLCH の明るさ
 * @param side 背景のどちらの側を探すか
 * @param target 届かせるコントラスト比
 * @returns 16進数の色
 */
export function findColorWithContrast(
  color: Oklch,
  background: Color,
  backgroundL: number,
  side: Side,
  target: number,
): HexColor {
  const extreme = side === 'dark' ? 0 : 1;
  const extremeColor = formatWithLightness(color, extreme);
  if (contrastWith(extremeColor, background) <= target) {
    return extremeColor;
  }
  // 届かない明るさ（near）と届く明るさ（far）の間を、二分探索で狭める
  let near = backgroundL;
  let far = extreme;
  for (let i = 0; i < SEARCH_STEPS; i++) {
    const middle = (near + far) / 2;
    if (
      contrastWith(formatWithLightness(color, middle), background) >= target
    ) {
      far = middle;
    } else {
      near = middle;
    }
  }
  return formatWithLightness(color, far);
}
