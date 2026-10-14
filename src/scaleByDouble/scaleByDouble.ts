import { DOUBLE_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByDoubleOptions } from './types';

/**
 * valueに対して1:2(Double)になる値を返す\
 *
 * 1:2\
 * 最も基本的で規律のある比率
 *
 * - 意図的な規則性を持たせる場合
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByDouble(
  value: number,
  options?: ScaleByDoubleOptions,
) {
  return scaleByRatio(value, DOUBLE_RATIO, options);
}
