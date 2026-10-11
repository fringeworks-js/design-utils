import { YAMATO_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByYamatoOptions } from './types';

/**
 * valueに対して大和比になる値を返す\
 *
 * 大和比 (≈ 1.414)\
 * 日本の伝統的な比率。√2比の別名\
 * 日本人が白銀比と呼ぶ場合はこちらを指していることが多い\
 *
 * - A4サイズの用紙比率
 * - 日本の伝統建築
 *
 * @param value
 * @param options
 * @returns
 */
const scaleByYamato = (value: number, options?: ScaleByYamatoOptions) =>
  _scaleByYamato(value, options);
scaleByYamato.dataLast = (options?: ScaleByYamatoOptions) => (value: number) =>
  _scaleByYamato(value, options);
export default scaleByYamato;

function _scaleByYamato(value: number, options?: ScaleByYamatoOptions) {
  return scaleByRatio(value, YAMATO_RATIO, options);
}
