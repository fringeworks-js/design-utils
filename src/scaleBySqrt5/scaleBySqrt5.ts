import { SQRT5_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySqrt5Options } from './types';

/**
 * valueに対して√5比になる値を返す\
 *
 * √5比 (≈ 2.236)\
 * 黄金比と関連が深く対称性や均整の取れたデザインに活用される比率
 *
 * - ギリシャ建築の柱の配置
 *
 * @param value
 * @param options
 * @returns
 */
const scaleBySqrt5 = (value: number, options?: ScaleBySqrt5Options) =>
  _scaleBySqrt5(value, options);
scaleBySqrt5.dataLast = (options?: ScaleBySqrt5Options) => (value: number) =>
  _scaleBySqrt5(value, options);
export default scaleBySqrt5;

function _scaleBySqrt5(value: number, options?: ScaleBySqrt5Options) {
  return scaleByRatio(value, SQRT5_RATIO, options);
}
