import { PLASTIC_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByPlasticOptions } from './types';

/**
 * `value` に対してプラスチック数の比になる値を返す
 *
 * プラスチック数 (≈ 1.325)\
 * x³ = x + 1 の実数解
 *
 * - 建築家 Dom Hans van der Laan の建築の寸法体系に由来する
 * - 隣り合うパドヴァン数の比が近づく値
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByPlastic(
  value: number,
  options?: ScaleByPlasticOptions,
) {
  return scaleByRatio(value, PLASTIC_RATIO, options);
}
