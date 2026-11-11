import round, { DEFAULT_DECIMALS } from '../../_internal/_round';
import type { CalculateColumnWidthOptions } from './types';

/**
 * カラムグリッドで `span` 列分の幅 (間の列の間隔を含む) を返す\
 * `span` が 0 以下の場合は 0 を返す
 *
 * @param span 列数
 * @param options
 * @returns
 */
export default function calculateColumnWidth(
  span: number,
  options: CalculateColumnWidthOptions,
) {
  const {
    columns,
    gutter,
    containerWidth,
    decimals = DEFAULT_DECIMALS,
  } = options;
  // 列が無い場合は間隔も無い (式のままだと -gutter になる)
  if (span <= 0) {
    return 0;
  }
  const columnWidth = (containerWidth - gutter * (columns - 1)) / columns;
  return round(columnWidth * span + gutter * (span - 1), decimals);
}
