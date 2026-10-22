import { MAJOR_THIRD_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByMajorThirdOptions } from './types';

/**
 * `value` に対して長3度の比になる値を返す
 *
 * 長3度の比 (5:4 = 1.25)\
 * 音楽の長3度の振動数の比
 *
 * - 標準的な文字サイズのスケール。ブログや一般的なサイト
 * - 文字サイズのスケールを作るツールで、既定値になっていることが多い
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByMajorThird(
  value: number,
  options?: ScaleByMajorThirdOptions,
) {
  return scaleByRatio(value, MAJOR_THIRD_RATIO, options);
}
