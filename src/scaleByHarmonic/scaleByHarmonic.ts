import { HARMONIC_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByHarmonicOptions } from './types';

/**
 * `value` に対して調和比になる値を返す
 *
 * 調和比 (4:3 ≈ 1.333)
 *
 * - 4:3 の画面 (アナログ放送のテレビ、iPad など)
 * - スマートフォンのカメラの標準の縦横比。ユーザーが投稿した写真の表示枠
 * - 音楽の完全4度の振動数の比 (`scaleByPerfectFourth` と同じ)
 * - メリハリのある文字サイズのスケール。コーポレートサイトやデスクトップ向けの記事
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByHarmonic(
  value: number,
  options?: ScaleByHarmonicOptions,
) {
  return scaleByRatio(value, HARMONIC_RATIO, options);
}
