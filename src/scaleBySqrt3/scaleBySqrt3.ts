import { SQRT3_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySqrt3Options } from './types';

/**
 * valueに対して√3比になる値を返す\
 *
 * √3比 (≈ 1.732)\
 * 建築・デザインの基礎となる幾何学的な比率
 *
 * - 正三角形の高さ比率（モジュール建築に活用）
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
