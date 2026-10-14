import { HARMONIC_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByHarmonicOptions } from './types';

/**
 * valueに対して調和比になる値を返す\
 *
 * 調和比 (≈ 1.333)\
 * 音楽や画面比率などでよく見られる比率
 *
 * - 昔のテレビ
 * - 音楽のコード進行
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
