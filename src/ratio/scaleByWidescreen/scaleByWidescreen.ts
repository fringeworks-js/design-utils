import { WIDESCREEN_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByWidescreenOptions } from './types';

/**
 * `value` に対してワイドスクリーンの比になる値を返す
 *
 * ワイドスクリーンの比 (16:9 ≈ 1.778)
 *
 * - 動画やハイビジョン放送の画面
 * - 動画の埋め込み (YouTube など)、ヒーロー画像、スライドの縦横比
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByWidescreen(
  value: number,
  options?: ScaleByWidescreenOptions,
) {
  return scaleByRatio(value, WIDESCREEN_RATIO, options);
}
