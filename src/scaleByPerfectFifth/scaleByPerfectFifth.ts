import { PERFECT_FIFTH_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByPerfectFifthOptions } from './types';

/**
 * `value` に対して完全5度の比になる値を返す
 *
 * 完全5度の比 (3:2 = 1.5)\
 * 音楽の完全5度の振動数の比
 *
 * - 段差のはっきりした文字サイズのスケール。LP やマーケティングページ、ポートフォリオなど、強い印象を与えたいとき
 * - 本文の行の高さ (WCAG 1.4.12 は、行の高さを文字サイズの 1.5 倍にしても崩れないことを求めている)
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByPerfectFifth(
  value: number,
  options?: ScaleByPerfectFifthOptions,
) {
  return scaleByRatio(value, PERFECT_FIFTH_RATIO, options);
}
