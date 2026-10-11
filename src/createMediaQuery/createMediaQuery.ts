import round from '../_internal/round';
import type { MediaQuery, MediaQueryOptions } from './types';

/**
 * `min-max` の書き方で、上限から引く幅 (px)
 */
const MAX_WIDTH_OFFSET = 0.02;

/**
 * ブレークポイントから `@media` / `@container` のクエリーを作る関数を返す
 *
 * @param breakpoints ブレークポイントの名前と幅 (px)
 * @param options
 * @returns
 */
export default function createMediaQuery<K extends string>(
  breakpoints: Readonly<Record<K, number>>,
  options: MediaQueryOptions = {},
): MediaQuery<K> {
  const { type = 'media', unit = 'px', syntax = 'range' } = options;

  const atRule = `@${type}`;
  const format = (px: number) =>
    // 浮動小数点の誤差を消すために丸める
    `${round(unit === 'em' ? px / 16 : px, 5)}${unit}`;
  const getWidth = (name: K) => {
    const width = breakpoints[name];
    if (typeof width !== 'number') {
      throw new RangeError(`Unknown breakpoint: ${name}`);
    }
    return width;
  };
  const getMinCondition = (px: number) =>
    syntax === 'range'
      ? `(width >= ${format(px)})`
      : `(min-width: ${format(px)})`;
  const getMaxCondition = (px: number) =>
    syntax === 'range'
      ? `(width < ${format(px)})`
      : `(max-width: ${format(px - MAX_WIDTH_OFFSET)})`;

  const up = (name: K) => `${atRule} ${getMinCondition(getWidth(name))}`;
  const down = (name: K) => `${atRule} ${getMaxCondition(getWidth(name))}`;
  const between = (min: K, max: K) => {
    const minWidth = getWidth(min);
    const maxWidth = getWidth(max);
    return syntax === 'range'
      ? `${atRule} (${format(minWidth)} <= width < ${format(maxWidth)})`
      : `${atRule} ${getMinCondition(minWidth)} and ${getMaxCondition(maxWidth)}`;
  };
  const only = (name: K) => {
    const width = getWidth(name);
    const next = (Object.keys(breakpoints) as K[])
      .filter((key) => breakpoints[key] > width)
      .sort((a, b) => breakpoints[a] - breakpoints[b])[0];
    return next === undefined ? up(name) : between(name, next);
  };

  return { up, down, between, only };
}
