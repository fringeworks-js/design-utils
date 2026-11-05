import { hasOwn } from '@fringeworks/utils/object/hasOwn';
import { DEFAULT_DECIMALS } from '../_internal/_round';
import { convertUnit } from '../convertUnit';
import { PAPER_SIZES } from './constants';
import type { GetPaperSizeOptions, PaperSizeName, Size } from './types';

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
  // `toString` などのプロトタイプのキーを除くため、自身のプロパティかを確認する
  if (!hasOwn(PAPER_SIZES, name)) {
    throw new RangeError(`Unknown paper size: ${name}`);
  }
  const { width, height } = PAPER_SIZES[name];
  const convert = (value: number) =>
    convertUnit(value, 'mm', unit, { decimals });
  return orientation === 'landscape'
    ? { width: convert(height), height: convert(width) }
    : { width: convert(width), height: convert(height) };
}
