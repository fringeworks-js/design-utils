import type { HexColor } from '@fringeworks/types';
import {
  converter,
  formatHex,
  formatHex8,
  modeA98,
  modeHsl,
  modeHwb,
  modeLab,
  modeLch,
  modeLrgb,
  modeOklab,
  modeOklch,
  modeP3,
  modeProphoto,
  modeRec2020,
  modeRgb,
  modeXyz50,
  modeXyz65,
  parse,
  toGamut,
  useMode,
  type Color,
  type Oklch,
} from 'culori/fn';

// AbsoluteColor の書き方（色の関数と color() の色空間）を読み取れるように、色空間を登録する
// culori/fn は使う色空間だけを登録する形なので、ここに無いものはバンドルに入らない
useMode(modeRgb);
useMode(modeLrgb);
useMode(modeHsl);
useMode(modeHwb);
useMode(modeLab);
useMode(modeLch);
useMode(modeOklab);
useMode(modeOklch);
useMode(modeP3);
useMode(modeRec2020);
useMode(modeA98);
useMode(modeProphoto);
useMode(modeXyz50);
useMode(modeXyz65);

const convertToOklch = converter('oklch');

// CSS Color 4 の gamut mapping（OKLCH で彩度を下げて sRGB に収める）
const mapToSrgb = toGamut('rgb', 'oklch');

/**
 * 色の文字列を読み取る\
 * culori の色のオブジェクトは公開の API に出さず、このモジュールの中だけで扱う
 * @param color
 * @returns 読み取れなかった場合は `undefined`
 */
export function parseColor(color: string): Color | undefined {
  return parse(color);
}

/**
 * 色の文字列を OKLCH の色として読み取る
 * @param color
 * @returns 読み取れなかった場合は `undefined`
 */
export function parseOklch(color: string): Oklch | undefined {
  const parsed = parse(color);
  return parsed === undefined ? undefined : convertToOklch(parsed);
}

/**
 * 色を sRGB に収め、16進数の文字列にする\
 * 透明度が 1 なら `#rrggbb`、1 未満なら `#rrggbbaa`
 * @param color
 * @returns
 */
export function formatColor(color: Color): HexColor {
  const mapped = mapToSrgb(color);
  return (
    mapped.alpha !== undefined && mapped.alpha < 1
      ? formatHex8(mapped)
      : formatHex(mapped)
  ) as HexColor;
}
