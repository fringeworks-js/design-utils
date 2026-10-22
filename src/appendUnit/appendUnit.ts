/**
 * `value` が数値の場合、単位を付けて文字列にする\
 * それ以外はそのまま返す
 *
 * @param value
 * @param unit 単位
 * @returns
 */
export default function appendUnit(value: number, unit?: string): string;
export default function appendUnit<T extends string | null | undefined>(
  value: T,
  unit?: string,
): T;
export default function appendUnit(
  value: string | number | null | undefined,
  unit?: string,
): string | null | undefined;
export default function appendUnit(
  value: string | number | null | undefined,
  unit: string = 'px',
) {
  if (typeof value === 'number') {
    return `${value}${unit}`;
  } else {
    return value;
  }
}
