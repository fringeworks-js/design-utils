/**
 * `toFixed` に渡せる桁数の上限
 */
const MAX_DECIMALS = 100;

/**
 * 小数点以下を指定の桁数に丸める
 * @param value
 * @param decimals 小数点以下の桁数。0〜100 の整数に収める (`NaN` は既定値にする)
 * @returns
 */
export default function round(value: number, decimals: number) {
  const digits = Number.isNaN(decimals)
    ? DEFAULT_DECIMALS
    : Math.min(Math.max(Math.trunc(decimals), 0), MAX_DECIMALS);
  // -0 を 0 にそろえる
  return Number(value.toFixed(digits)) + 0;
}

/**
 * decimals の既定値
 */
export const DEFAULT_DECIMALS = 3;
