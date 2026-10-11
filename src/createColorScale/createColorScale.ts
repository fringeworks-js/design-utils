import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { ColorScaleOptions } from './types';

const DEFAULT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * 1つの色から、段階ごとの色を CSS の `color-mix()` の文字列で作る
 *
 * 色の計算はブラウザーが行うため、`var(--brand)` のような CSS 変数も元の色に使える\
 * `baseStep` より小さい段階は `light`、大きい段階は `dark` を、段階に比例した割合で混ぜる
 *
 * @param color 元の色
 * @param options
 * @returns 段階をキーにしたオブジェクト
 */
export default function createColorScale(
  color: string,
  options: ColorScaleOptions = {},
): Record<number, string> {
  const {
    steps = DEFAULT_STEPS,
    baseStep = 500,
    space = 'oklch',
    light = 'white',
    dark = 'black',
    decimals = DEFAULT_DECIMALS,
  } = options;

  const mix = (ratio: number, other: string) => {
    const percentage = round(Math.min(Math.max(ratio, 0), 1) * 100, decimals);
    return `color-mix(in ${space}, ${color} ${percentage}%, ${other})`;
  };

  const result: Record<number, string> = {};
  for (const step of steps) {
    if (step === baseStep) {
      result[step] = color;
    } else if (step < baseStep) {
      result[step] = mix(step / baseStep, light);
    } else {
      result[step] = mix((1000 - step) / (1000 - baseStep), dark);
    }
  }
  return result;
}
