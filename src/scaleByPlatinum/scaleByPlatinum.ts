import { PLATINUM_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByPlatinumOptions } from './types';

/**
 * valueに対して白金比になる値を返す\
 *
 * 白金比 (≈ 1.325)\
 * 黄金比よりも控えめで洗練された比率
 *
 * - 日本の近代建築
 * - 日本のキャラデザイン
 *
 * @param value
 * @param options
 * @returns
 */
const scaleByPlatinum = (value: number, options?: ScaleByPlatinumOptions) =>
  _scaleByPlatinum(value, options);
scaleByPlatinum.dataLast =
  (options?: ScaleByPlatinumOptions) => (value: number) =>
    _scaleByPlatinum(value, options);
export default scaleByPlatinum;

function _scaleByPlatinum(value: number, options?: ScaleByPlatinumOptions) {
  return scaleByRatio(value, PLATINUM_RATIO, options);
}
