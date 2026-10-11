/**
 * 小数点以下を指定の桁数に丸める
 * @param value
 * @param decimals 小数点以下の桁数
 * @returns
 */
export default function round(value: number, decimals: number) {
  // -0 を 0 にそろえる
  return Number(value.toFixed(decimals)) + 0;
}

/**
 * decimals の既定値
 */
export const DEFAULT_DECIMALS = 3;
