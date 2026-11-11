import { YAMATO_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByYamatoOptions } from './types';

/**
 * `value` に対して大和比になる値を返す
 *
 * 大和比 (≈ 1.414)\
 * √2比の日本での呼び名。日本では白銀比と呼ばれることも多い
 *
 * - A 判・B 判の用紙の縦横比
 * - 印刷用のレイアウト (`@page`) や PDF のサムネイルの縦横比
 * - 日本の建築やキャラクターデザインで使われ、日本人になじみやすく、安定した印象を与えるとされる
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByYamato(
  value: number,
  options?: ScaleByYamatoOptions,
) {
  return scaleByRatio(value, YAMATO_RATIO, options);
}
