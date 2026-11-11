import { GOLDEN_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByGoldenOptions } from './types';

/**
 * `value` に対して黄金比になる値を返す
 *
 * 黄金比 ((1 + √5) / 2 ≈ 1.618)\
 * 貴金属比 (x² = nx + 1 の正の解) の n = 1 の値
 *
 * - 正五角形の対角線と辺の比
 * - 隣り合うフィボナッチ数の比が近づく値
 * - 段差の大きい文字サイズのスケール。見出しを大胆に見せたい、ビジュアル重視のページ
 * - 2カラムのレイアウトの分割 (メインとサイドバーを 61.8 : 38.2 にするなど)
 * - 調和が取れた、古典的な印象を与えるとされる
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByGolden(
  value: number,
  options?: ScaleByGoldenOptions,
) {
  return scaleByRatio(value, GOLDEN_RATIO, options);
}
