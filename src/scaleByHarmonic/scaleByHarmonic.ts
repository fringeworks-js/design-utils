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
const scaleByHarmonic = (value: number, options?: ScaleByHarmonicOptions) =>
  _scaleByHarmonic(value, options);
scaleByHarmonic.dataLast =
  (options?: ScaleByHarmonicOptions) => (value: number) =>
    _scaleByHarmonic(value, options);
export default scaleByHarmonic;

function _scaleByHarmonic(value: number, options?: ScaleByHarmonicOptions) {
  return scaleByRatio(value, HARMONIC_RATIO, options);
}
