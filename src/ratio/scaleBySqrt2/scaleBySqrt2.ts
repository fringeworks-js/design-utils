import { SQRT2_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleBySqrt2Options } from './types';

/**
 * `value` に対して√2比になる値を返す
 *
 * √2比 (≈ 1.414)
 *
 * - A 判・B 判の用紙の縦横比 (半分に切っても同じ比になる)
 * - 印刷用のレイアウト (`@page`) や PDF のサムネイルの縦横比
 * - 文字サイズのスケール (音楽の増4度)。1.333 と 1.5 の中間の段差
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleBySqrt2(
  value: number,
  options?: ScaleBySqrt2Options,
) {
  return scaleByRatio(value, SQRT2_RATIO, options);
}
