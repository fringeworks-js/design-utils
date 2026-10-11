import { GOLDEN_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByGoldenOptions } from './types';

/**
 * valueに対して黄金比になる値を返す\
 *
 * 黄金比 (φ ≈ 1.618)\
 * 世界的に知られた美しい比率
 *
 * - レオナルド・ダ・ヴィンチの「モナ・リザ」
 * - フィボナッチスパイラル（黄金螺旋）を使った構図設計
 * - パルテノン神殿
 * - Appleのロゴ
 *
 * @param value
 * @param options
 * @returns
 */
const scaleByGolden = (value: number, options?: ScaleByGoldenOptions) =>
  _scaleByGolden(value, options);
scaleByGolden.dataLast = (options?: ScaleByGoldenOptions) => (value: number) =>
  _scaleByGolden(value, options);
export default scaleByGolden;

function _scaleByGolden(value: number, options?: ScaleByGoldenOptions) {
  return scaleByRatio(value, GOLDEN_RATIO, options);
}
