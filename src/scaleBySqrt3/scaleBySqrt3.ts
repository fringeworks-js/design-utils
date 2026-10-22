import { SQRT3_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySqrt3Options } from './types';

/**
 * `value` に対して√3比になる値を返す
 *
 * √3比 (≈ 1.732)
 *
 * - 正六角形の、向かい合う辺の間の距離と辺の比
 * - 六角形のグリッドの計算 (正六角形の幅と高さの比は 2:√3)
 * - アイソメトリックのイラストやグリッドの計算
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleBySqrt3(
  value: number,
  options?: ScaleBySqrt3Options,
) {
  return scaleByRatio(value, SQRT3_RATIO, options);
}
