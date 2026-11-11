import { BRONZE_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByBronzeOptions } from './types';

/**
 * `value` に対して青銅比になる値を返す
 *
 * 青銅比 ((3 + √13) / 2 ≈ 3.303)\
 * 貴金属比 (x² = nx + 1 の正の解) の n = 3 の値
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByBronze(
  value: number,
  options?: ScaleByBronzeOptions,
) {
  return scaleByRatio(value, BRONZE_RATIO, options);
}
