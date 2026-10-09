import { fitToRatio } from '../fitToRatio';
import type { FitToGoldenOptions } from './types';

/**
 * 黄金比 (φ ≈ 1.618)
 */
const RATIO = (1 + Math.sqrt(5)) / 2;

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
const fitToGolden = (value: number, options?: FitToGoldenOptions) =>
  _fitToGolden(value, options);
fitToGolden.dataLast = (options?: FitToGoldenOptions) => (value: number) =>
  _fitToGolden(value, options);
export default fitToGolden;

function _fitToGolden(value: number, options?: FitToGoldenOptions) {
  return fitToRatio(value, RATIO, options);
}
