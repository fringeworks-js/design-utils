import { SQRT2_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySqrt2Options } from './types';

/**
 * valueに対して√2比になる値を返す\
 *
 * √2比 (≈ 1.414)\
 * 建築・デザインの基礎となる幾何学的な比率
 *
 * - A4サイズの用紙比率
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleBySqrt2(
  value: number,
  options?: ScaleBySqrt2Options,
) {
  return scaleByRatio(value, SQRT2_RATIO, options);
}
