import { SQRT5_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySqrt5Options } from './types';

/**
 * `value` に対して√5比になる値を返す
 *
 * √5比 (≈ 2.236)
 *
 * - 1:2 の長方形の、対角線と短い辺の比
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleBySqrt5(
  value: number,
  options?: ScaleBySqrt5Options,
) {
  return scaleByRatio(value, SQRT5_RATIO, options);
}
