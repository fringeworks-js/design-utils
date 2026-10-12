import { GOLDEN_RATIO } from '../scaleByRatio';
import type { ModularScaleOptions } from './types';

/**
 * 丸めない値を返すモジュラースケールの関数を作る
 */
export default function _createModularScale(
  options: Omit<ModularScaleOptions, 'decimals'> = {},
): (step: number) => number {
  const { base = 16, ratio = GOLDEN_RATIO } = options;
  const bases = typeof base === 'number' ? [base] : base;

  if (bases.length === 0 || bases.some((value) => !(value > 0))) {
    throw new RangeError('base must be positive numbers');
  }
  // 上で空でないことを確認している
  const first = bases[0]!;
  if (bases.length === 1) {
    return (step) => first * ratio ** step;
  }
  if (!(ratio > 1)) {
    throw new RangeError('ratio must be greater than 1 when base is an array');
  }

  // 2つ目以降の基準値を [base[0], base[0] * ratio) の範囲に移して並べる
  const values = [first];
  for (const value of bases.slice(1)) {
    const exponent = Math.floor(Math.log(value / first) / Math.log(ratio));
    let normalized = value / ratio ** exponent;
    // 浮動小数点の誤差で範囲の端を越えた場合の補正
    if (normalized >= first * ratio) normalized /= ratio;
    if (normalized < first) normalized *= ratio;
    if (values.every((v) => Math.abs(v - normalized) > first * 1e-9)) {
      values.push(normalized);
    }
  }
  values.sort((a, b) => a - b);

  const { length } = values;
  return (step) => {
    const index = ((step % length) + length) % length;
    return values[index]! * ratio ** Math.floor(step / length);
  };
}
