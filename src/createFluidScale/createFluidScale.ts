import { createFluidValue } from '../createFluidValue';
import _createModularScale from '../createModularScale/_createModularScale';
import type { FluidScaleOptions } from './types';

/**
 * 幅に応じて基準値と比率が変わるモジュラースケールの関数を作る
 *
 * 返す関数は、段階 (`step`) を受け取り、
 * `min` のスケールの値から `max` のスケールの値まで変化する CSS の `clamp()` の文字列を返す
 *
 * @param options
 * @returns
 */
export default function createFluidScale(
  options: FluidScaleOptions,
): (step: number) => string {
  const { min, max, ...fluidValueOptions } = options;
  const minScale = _createModularScale(min);
  const maxScale = _createModularScale(max);
  return (step) =>
    createFluidValue(minScale(step), maxScale(step), fluidValueOptions);
}
