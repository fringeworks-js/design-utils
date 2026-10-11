import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { CalculateColumnWidthOptions } from './types';

/**
 * カラムグリッドで `span` 列分の幅 (間の列の間隔を含む) を返す
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
  const columnWidth = (containerWidth - gutter * (columns - 1)) / columns;
  return round(columnWidth * span + gutter * (span - 1), decimals);
}
