import { MAJOR_SECOND_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByMajorSecondOptions } from './types';

/**
 * `value` に対して長2度の比になる値を返す
 *
 * 長2度の比 (9:8 = 1.125)\
 * 音楽の長2度の振動数の比
 *
 * - 段差の小さい文字サイズのスケール。ドキュメントや管理画面など情報量の多い UI、モバイル
 * - 控えめで落ち着いた印象を与えたいとき
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByMajorSecond(
  value: number,
  options?: ScaleByMajorSecondOptions,
) {
  return scaleByRatio(value, MAJOR_SECOND_RATIO, options);
}
