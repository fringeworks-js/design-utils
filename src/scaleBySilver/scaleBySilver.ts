import { SILVER_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySilverOptions } from './types';

/**
 * valueに対して白銀比になる値を返す\
 *
 * 白銀比 (≈ 2.414)\
 * 日本の美意識に強く影響を与えている比率
 *
 * - 法隆寺の五重塔、金閣寺 などの寺社建築
 * - 畳の比率
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleBySilver(
  value: number,
  options?: ScaleBySilverOptions,
) {
  return scaleByRatio(value, SILVER_RATIO, options);
}
