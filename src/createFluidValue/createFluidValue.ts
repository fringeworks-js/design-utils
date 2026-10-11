import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { FluidValueOptions } from './types';

/**
 * 幅に応じて `min` から `max` まで変化する値を、CSS の `clamp()` の文字列で返す
 *
 * `min` と `max` は px で指定する\
 * `min` が `max` より大きい場合は、幅が広がるほど小さくなる値になる
 *
 * @param min `minViewport` での値 (px)
 * @param max `maxViewport` での値 (px)
 * @param options
 * @returns
 */
export default function createFluidValue(
  min: number,
  max: number,
  options: FluidValueOptions = {},
): string {
  const {
    minViewport = 375,
    maxViewport = 1280,
    unit = 'rem',
    rootFontSize = 16,
    relativeTo = 'viewport',
    decimals = DEFAULT_DECIMALS,
  } = options;

  if (minViewport === maxViewport) {
    throw new RangeError('minViewport and maxViewport must be different');
  }

  const scale = unit === 'rem' ? 1 / rootFontSize : 1;
  const format = (px: number) => `${round(px * scale, decimals)}${unit}`;

  if (min === max) return format(min);

  const slope = (max - min) / (maxViewport - minViewport);
  const intercept = min - slope * minViewport;
  const sign = slope < 0 ? '-' : '+';
  const slopeValue = round(Math.abs(slope) * 100, decimals);
  const viewportUnit = relativeTo === 'container' ? 'cqi' : 'vw';
  const preferred = `${format(intercept)} ${sign} ${slopeValue}${viewportUnit}`;

  return `clamp(${format(Math.min(min, max))}, ${preferred}, ${format(Math.max(min, max))})`;
}
