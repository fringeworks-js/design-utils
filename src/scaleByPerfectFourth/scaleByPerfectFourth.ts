import { PERFECT_FOURTH_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByPerfectFourthOptions } from './types';

/**
 * `value` に対して完全4度の比になる値を返す
 *
 * 完全4度の比 (4:3 ≈ 1.333)\
 * 音楽の完全4度の振動数の比。調和比 (`scaleByHarmonic`) と同じ
 *
 * - メリハリのある文字サイズのスケール。コーポレートサイトやデスクトップ向けの記事
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByPerfectFourth(
  value: number,
  options?: ScaleByPerfectFourthOptions,
) {
  return scaleByRatio(value, PERFECT_FOURTH_RATIO, options);
}
