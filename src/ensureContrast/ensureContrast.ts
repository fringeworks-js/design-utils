import type { AbsoluteColor, HexColor } from '@fringeworks/types';
import { wcagContrast } from 'culori/fn';
import { formatColor, parseColor, parseOklch } from '../_internal/_color';

/**
 * 明るさを探す回数（明るさの差が 1/2^20 未満になるまで）
 */
const SEARCH_STEPS = 20;

/**
 * 比べる色との WCAG 2 のコントラスト比が `ratio` に届くまで、色の明るさを OKLCH で変える
 *
 * すでに届いている場合は、元の色をそのまま返す。届いていない場合は、比べる色より明るい色なら明るく、暗い色なら暗くし、
 * 届く中で最も元の色に近い明るさにする。白・黒まで変えても届かない場合は、白・黒まで変えた色を返す。
 * 彩度と色相はそのままにする（sRGB に収まらない場合は、CSS Color 4 の方法で彩度を下げて収める）。
 *
 * @param color 元の色
 * @param against 比べる色（背景の色など）
 * @param ratio 届かせるコントラスト比（1〜21 に収める）
 * @returns 16進数の色。どちらかの色を読み取れない場合は `undefined`
 */
export default function ensureContrast(
  color: AbsoluteColor,
  against: AbsoluteColor,
  ratio: number,
): HexColor | undefined {
  const parsed = parseOklch(color);
  const parsedAgainst = parseColor(against);
  if (parsed === undefined || parsedAgainst === undefined) {
    return undefined;
  }
  const target = Math.min(Math.max(ratio, 1), 21);
  const withLightness = (l: number) => formatColor({ ...parsed, l });
  const contrastOf = (hex: HexColor) =>
    wcagContrast(parseColor(hex)!, parsedAgainst);

  const original = withLightness(parsed.l);
  if (contrastOf(original) >= target) {
    return original;
  }
  // 比べる色から遠ざかる向きに、明るさを変える
  const towardDark =
    wcagContrast(parsedAgainst, '#000000') >=
    wcagContrast(parsedAgainst, '#ffffff');
  const extreme = towardDark ? 0 : 1;
  if (contrastOf(withLightness(extreme)) < target) {
    return withLightness(extreme);
  }
  // 届かない明るさ（near）と届く明るさ（far）の間を、二分探索で狭める
  let near = parsed.l;
  let far = extreme;
  for (let i = 0; i < SEARCH_STEPS; i++) {
    const middle = (near + far) / 2;
    if (contrastOf(withLightness(middle)) >= target) {
      far = middle;
    } else {
      near = middle;
    }
  }
  return withLightness(far);
}
