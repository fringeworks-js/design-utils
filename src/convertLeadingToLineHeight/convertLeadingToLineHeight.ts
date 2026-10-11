import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { ConvertLeadingToLineHeightOptions } from './types';

/**
 * 行送り (文字サイズを含む行の間隔) を、単位なしの `line-height` に変換する
 *
 * `leading` と `fontSize` は同じ単位で指定する
 *
 * @param leading 行送り
 * @param fontSize 文字サイズ
 * @param options
 * @returns
 */
export default function convertLeadingToLineHeight(
  leading: number,
  fontSize: number,
  options: ConvertLeadingToLineHeightOptions = {},
) {
  const { decimals = DEFAULT_DECIMALS } = options;
  return round(leading / fontSize, decimals);
}
