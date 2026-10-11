import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { EasingFunction, LinearEasingOptions } from './types';

/**
 * JavaScript のイージング関数を、CSS の `linear()` の文字列に変換する
 *
 * `samples` 個の区間で計算した点のうち、
 * 前後の点を直線でつないでも誤差が `tolerance` 以下になる点を間引いて出力する
 *
 * @param easing イージング関数
 * @param options
 * @returns
 */
export default function createLinearEasing(
  easing: EasingFunction,
  options: LinearEasingOptions = {},
): string {
  const {
    samples = 100,
    tolerance = 0.002,
    decimals = DEFAULT_DECIMALS,
  } = options;

  if (!Number.isInteger(samples) || samples < 1) {
    throw new RangeError('samples must be a positive integer');
  }

  const values = Array.from({ length: samples + 1 }, (_, i) =>
    easing(i / samples),
  );
  const indexes = simplify(values, tolerance);
  const format = (value: number) => round(value, decimals);

  // 間引いていない場合は、位置を省略しても等間隔になる
  if (indexes.length === values.length) {
    return `linear(${values.map(format).join(', ')})`;
  }

  const points = indexes.map((index, i) => {
    const value = format(values[index]);
    // 最初と最後の点は位置を省略できる (0% と 100%)
    if (i === 0 || i === indexes.length - 1) return `${value}`;
    return `${value} ${format((index / samples) * 100)}%`;
  });
  return `linear(${points.join(', ')})`;
}

/**
 * Ramer–Douglas–Peucker 法で点を間引き、残す点の index を返す\
 * 横軸は等間隔なので、誤差は縦方向の差で測る
 */
function simplify(values: readonly number[], tolerance: number) {
  const keep = new Array<boolean>(values.length).fill(false);
  keep[0] = true;
  keep[values.length - 1] = true;

  const stack: [number, number][] = [[0, values.length - 1]];
  while (stack.length > 0) {
    const [start, end] = stack.pop()!;
    let maxError = -1;
    let maxIndex = -1;
    for (let i = start + 1; i < end; i++) {
      const expected =
        values[start] +
        ((values[end] - values[start]) * (i - start)) / (end - start);
      const error = Math.abs(values[i] - expected);
      if (error > maxError) {
        maxError = error;
        maxIndex = i;
      }
    }
    if (maxIndex !== -1 && (tolerance <= 0 || maxError > tolerance)) {
      keep[maxIndex] = true;
      stack.push([start, maxIndex], [maxIndex, end]);
    }
  }

  return keep.flatMap((kept, index) => (kept ? [index] : []));
}
