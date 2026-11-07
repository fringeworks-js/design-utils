import type { AbsoluteColor } from '@fringeworks/types';
import { wcagContrast } from 'culori/fn';
import { parseColor } from '../_internal/_color';
import round, { DEFAULT_DECIMALS } from '../_internal/_round';
import type { CalculateContrastRatioOptions } from './types';

/**
 * 2つの色の、WCAG 2 のコントラスト比（1〜21）を返す\
 * 透明度は考えず、不透明な色として比べる
 *
 * @param color 1つ目の色
 * @param other 2つ目の色
 * @param options
 * @returns どちらかの色を読み取れない場合は `undefined`
 */
export default function calculateContrastRatio(
  color: AbsoluteColor,
  other: AbsoluteColor,
  options: CalculateContrastRatioOptions = {},
): number | undefined {
  const { decimals = DEFAULT_DECIMALS } = options;
  const first = parseColor(color);
  const second = parseColor(other);
  if (first === undefined || second === undefined) {
    return undefined;
  }
  return round(wcagContrast(first, second), decimals);
}
