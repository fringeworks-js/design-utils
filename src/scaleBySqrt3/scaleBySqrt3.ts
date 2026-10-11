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
const scaleBySqrt3 = (value: number, options?: ScaleBySqrt3Options) =>
  _scaleBySqrt3(value, options);
scaleBySqrt3.dataLast = (options?: ScaleBySqrt3Options) => (value: number) =>
  _scaleBySqrt3(value, options);
export default scaleBySqrt3;

function _scaleBySqrt3(value: number, options?: ScaleBySqrt3Options) {
  return scaleByRatio(value, SQRT3_RATIO, options);
}
