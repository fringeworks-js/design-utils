import { PLATINUM_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByPlatinumOptions } from './types';

/**
 * `value` に対して白金比になる値を返す
 *
 * 白金比 (≈ 1.732)\
 * √3比の別名
 *
 * - 30°・60°・90° の直角三角形の、直角をはさむ2辺の比
 * - 六角形のグリッドの計算 (正六角形の幅と高さの比は 2:√3)
 * - アイソメトリックのイラストやグリッドの計算
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByPlatinum(
  value: number,
  options?: ScaleByPlatinumOptions,
) {
  return scaleByRatio(value, PLATINUM_RATIO, options);
}
