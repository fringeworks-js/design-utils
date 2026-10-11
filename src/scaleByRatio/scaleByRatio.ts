import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { ScaleByRatioOptions } from './types';

/**
 * 比率に合った値を返す
 * @param value 元の値
 * @param ratio 比率
 * @param options
 * @returns
 */
const scaleByRatio = (
  value: number,
  ratio: number,
  options: ScaleByRatioOptions = {},
) => _scaleByRatio(value, ratio, options);
scaleByRatio.dataLast =
  (ratio: number, options: ScaleByRatioOptions = {}) =>
  (value: number) =>
    _scaleByRatio(value, ratio, options);
export default scaleByRatio;

function _scaleByRatio(
  value: number,
  ratio: number,
  options: ScaleByRatioOptions = {},
) {
  const { mode = 'expand', decimals = DEFAULT_DECIMALS } = options;
  const result = mode === 'shrink' ? value / ratio : value * ratio;
  return round(result, decimals);
}
