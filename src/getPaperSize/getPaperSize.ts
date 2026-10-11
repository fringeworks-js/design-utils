import { DEFAULT_DECIMALS } from '../_internal/round';
import type { Size } from '../calculateObjectFit';
import { convertUnit } from '../convertUnit';
import { PAPER_SIZES } from './constants';
import type { GetPaperSizeOptions, PaperSizeName } from './types';

/**
 * 紙のサイズを返す
 *
 * `px` などへの変換は CSS の定義 (1in = 96px) に従う
 *
 * @param name 紙のサイズの名前 (`A4`, `JIS-B5`, `letter` など)
 * @param options
 * @returns
 */
export default function getPaperSize(
  name: PaperSizeName,
  options: GetPaperSizeOptions = {},
): Size {
  const {
    orientation = 'portrait',
    unit = 'mm',
    decimals = DEFAULT_DECIMALS,
  } = options;
  const { width, height } = PAPER_SIZES[name];
  const convert = convertUnit.dataLast('mm', unit, { decimals });
  return orientation === 'landscape'
    ? { width: convert(height), height: convert(width) }
    : { width: convert(width), height: convert(height) };
}
