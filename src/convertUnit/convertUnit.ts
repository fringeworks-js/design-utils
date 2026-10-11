import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { ConvertUnitOptions, CssUnit } from './types';

/**
 * CSS の長さの単位を変換する
 *
 * 絶対単位は CSS の定義 (1in = 96px = 72pt) に従う\
 * `Q` は 1/4mm (写植・DTP の級・歯)
 *
 * @param value 元の値
 * @param from 元の単位
 * @param to 変換後の単位
 * @param options
 * @returns
 */
const convertUnit = (
  value: number,
  from: CssUnit,
  to: CssUnit,
  options: ConvertUnitOptions = {},
) => _convertUnit(value, from, to, options);
convertUnit.dataLast =
  (from: CssUnit, to: CssUnit, options: ConvertUnitOptions = {}) =>
  (value: number) =>
    _convertUnit(value, from, to, options);
export default convertUnit;

function _convertUnit(
  value: number,
  from: CssUnit,
  to: CssUnit,
  options: ConvertUnitOptions,
) {
  const { decimals = DEFAULT_DECIMALS } = options;
  return round(
    (value * getPixelsPerUnit(from, options)) / getPixelsPerUnit(to, options),
    decimals,
  );
}

/**
 * 1単位あたりの px を返す
 */
function getPixelsPerUnit(unit: CssUnit, options: ConvertUnitOptions) {
  const { rootFontSize = 16, fontSize = rootFontSize } = options;
  switch (unit) {
    case 'px':
      return 1;
    case 'rem':
      return rootFontSize;
    case 'em':
      return fontSize;
    case 'pt':
      return 96 / 72;
    case 'pc':
      return 16;
    case 'in':
      return 96;
    case 'cm':
      return 96 / 2.54;
    case 'mm':
      return 96 / 25.4;
    case 'Q':
      return 96 / 101.6;
    default:
      throw new RangeError(`Unknown unit: ${unit satisfies never}`);
  }
}
