import { MINOR_THIRD_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByMinorThirdOptions } from './types';

/**
 * `value` に対して短3度の比になる値を返す
 *
 * 短3度の比 (6:5 = 1.2)\
 * 音楽の短3度の振動数の比
 *
 * - 控えめな文字サイズのスケール。アプリの UI やダッシュボード、モバイル
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByMinorThird(
  value: number,
  options?: ScaleByMinorThirdOptions,
) {
  return scaleByRatio(value, MINOR_THIRD_RATIO, options);
}
