import { DOUBLE_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByDoubleOptions } from './types';

/**
 * `value` に対して1:2になる値を返す
 *
 * 1:2\
 * 半分・倍の関係になる、最も単純な比率
 *
 * - 畳の縦横比
 * - 4・8・16・32 と倍々に増やす余白のスケール (8pt グリッドなど)
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
