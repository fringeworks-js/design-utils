import { ULTRAWIDE_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByUltrawideOptions } from './types';

/**
 * `value` に対してウルトラワイドの比になる値を返す
 *
 * ウルトラワイドの比 (21:9 ≈ 2.333)\
 * ウルトラワイドの画面の呼び名に合わせた値 (実際の画面は 64:27 ≈ 2.370 のものが多い)
 *
 * - 映画風の横長のバナーやビジュアルの縦横比
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByUltrawide(
  value: number,
  options?: ScaleByUltrawideOptions,
) {
  return scaleByRatio(value, ULTRAWIDE_RATIO, options);
}
