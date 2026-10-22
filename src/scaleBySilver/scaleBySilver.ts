import { SILVER_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySilverOptions } from './types';

/**
 * `value` に対して白銀比になる値を返す
 *
 * 白銀比 (1 + √2 ≈ 2.414)\
 * 貴金属比 (x² = nx + 1 の正の解) の n = 2 の値\
 * 日本で白銀比と呼ばれることが多い 1:√2 は `scaleByYamato` (`scaleBySqrt2`) を使う
 *
 * - 正八角形の、向かい合う辺の間の距離と辺の比
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleBySilver(
  value: number,
  options?: ScaleBySilverOptions,
) {
  return scaleByRatio(value, SILVER_RATIO, options);
}
