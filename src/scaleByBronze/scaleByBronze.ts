import { BRONZE_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByBronzeOptions } from './types';

/**
 * valueに対して青銅比になる値を返す\
 *
 * 青銅比 (≈ 3.303)\
 * 縦長、横長のデザインに利用される比率
 *
 * - ゴシック建築の尖塔
 *
 * @param value
 * @param options
 * @returns
 */
const scaleByBronze = (value: number, options?: ScaleByBronzeOptions) =>
  _scaleByBronze(value, options);
scaleByBronze.dataLast = (options?: ScaleByBronzeOptions) => (value: number) =>
  _scaleByBronze(value, options);
export default scaleByBronze;

function _scaleByBronze(value: number, options?: ScaleByBronzeOptions) {
  return scaleByRatio(value, BRONZE_RATIO, options);
}
