import round, { DEFAULT_DECIMALS } from '../_internal/round';
import _createModularScale from './_createModularScale';
import type { ModularScaleOptions } from './types';

/**
 * モジュラースケールの関数を作る
 *
 * 返す関数は、段階 (`step`) を受け取り、`base × ratio ^ step` を返す\
 * `base` が配列の場合は、各基準値から作ったスケールを1つに合わせ、小さい順に段階を振る
 *
 * @param options
 * @returns
 */
export default function createModularScale(
  options: ModularScaleOptions = {},
): (step: number) => number {
  const { decimals = DEFAULT_DECIMALS } = options;
  const scale = _createModularScale(options);
  return (step) => round(scale(step), decimals);
}
