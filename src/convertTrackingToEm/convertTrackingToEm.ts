import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { ConvertTrackingToEmOptions } from './types';

/**
 * Illustrator や InDesign などのトラッキング (1/1000em) を、
 * CSS の `letter-spacing` に使う `em` の値に変換する
 *
 * @param tracking トラッキングの値
 * @param options
 * @returns
 */
export default function convertTrackingToEm(
  tracking: number,
  options: ConvertTrackingToEmOptions = {},
) {
  const { decimals = DEFAULT_DECIMALS } = options;
  return round(tracking / 1000, decimals);
}
