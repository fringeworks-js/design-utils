import type { AbsoluteColor, HexColor } from '@fringeworks/types';
import type { Color, Oklch } from 'culori/fn';
import { parseColor, parseOklch } from '../../_internal/_color';
import {
  contrastWith,
  findColorWithContrast,
  formatWithLightness,
  type Side,
} from '../../_internal/_findColorWithContrast';
import { harmonyAngles, rotateHue } from '../../_internal/_harmonyAngles';
import type { CreateAccentColorOptions } from './types';

// 数値は、プライマリのよくある色・暗い色・明るい色を、白と暗い背景の上で見比べて決めた

/** 回す色相の既定値（Material Design 3 の tertiary と同じ） */
const DEFAULT_HUE = 60;

/** 目立たせる色: 元の色の背景とのコントラスト比がこれ以上なら（すでに十分濃い）、背景に近づける */
const TOWARD_THRESHOLD = 8;

/** 目立たせる色: 寄せる先の背景とのコントラスト比（Material Design 3 の tertiary の濃さ） */
const REFERENCE_CONTRAST = 6;

/** 目立たせる色: 元の色の比から、寄せる先の比へ寄せる割合 */
const PULL_AMOUNT = 0.5;

/** 目立たせる色: 元の色との OKLCH の明るさの差の下限（sRGB に収めるときに少し変わるので、目安） */
const MIN_LIGHTNESS_DIFFERENCE = 0.05;

/** 目立たせる色: 背景とのコントラスト比の下限（WCAG 1.4.3 の通常の大きさの文字） */
const MIN_CONTRAST = 4.5;

/** 控えめな色: 元の色の彩度に掛ける倍率 */
const SUBTLE_CHROMA_SCALE = 0.25;

/** 控えめな色: 明るい背景とのコントラスト比 */
const SUBTLE_CONTRAST_ON_LIGHT = 1.1;

/** 控えめな色: 暗い背景とのコントラスト比（暗い背景では差が見えにくいので、明るい背景より離す） */
const SUBTLE_CONTRAST_ON_DARK = 1.3;

/**
 * 1つの色（プライマリカラーなど）に合うアクセントカラーを作る
 *
 * 色相を OKLCH で回し（既定は 60°）、明るさを背景とのコントラスト比で決める。
 *
 * - `'strong'`（既定）: 目立たせる色。彩度は元の色のまま。元の色より背景から遠ざけて濃くし、背景とのコントラスト比 4.5 以上にする。
 *   元の色がすでに十分濃い（背景との比が 8 以上）場合は、それ以上濃くすると黒（暗い背景では白）に近づくので、背景に近づけて淡くする。
 *   どちらも、元の色との OKLCH の明るさの差をおよそ 0.05 以上にする（sRGB に収めるときに、明るさが少し変わることがある）
 * - `'subtle'`: 控えめな色。彩度は元の色の 1/4。背景との比を、明るい背景で 1.1、暗い背景で 1.3 にする
 *
 * 無彩色（白・灰色など）は色相を持たないので、明るさだけが違う無彩色になる。
 *
 * @param color 元の色
 * @param options
 * @returns 16進数の色。`color` か `background` を読み取れない場合は `undefined`
 */
export default function createAccentColor(
  color: AbsoluteColor,
  options: CreateAccentColorOptions = {},
): HexColor | undefined {
  const { emphasis = 'strong', background = '#ffffff', hue } = options;
  const parsed = parseOklch(color);
  const parsedBackground = parseColor(background);
  const backgroundOklch = parseOklch(background);
  if (
    parsed === undefined ||
    parsedBackground === undefined ||
    backgroundOklch === undefined
  ) {
    return undefined;
  }
  const degrees =
    typeof hue === 'string' ? harmonyAngles[hue][1]! : (hue ?? DEFAULT_HUE);
  const rotated: Oklch = { ...parsed, h: rotateHue(parsed.h, degrees) };

  if (emphasis === 'subtle') {
    return createSubtle(rotated, parsedBackground, backgroundOklch.l);
  }
  return createStrong(parsed, rotated, parsedBackground, backgroundOklch.l);
}

function createStrong(
  original: Oklch,
  rotated: Oklch,
  background: Color,
  backgroundL: number,
): HexColor {
  const seedContrast = contrastWith(
    formatWithLightness(original, original.l),
    background,
  );
  // 元の色と同じ側（白の背景なら暗い側）に置く。その側で比 4.5 に届かない場合（白の背景に白など）は、反対の側に置く
  let side: Side = rotated.l < backgroundL ? 'dark' : 'light';
  const extremeOf = (s: Side) =>
    formatWithLightness(rotated, s === 'dark' ? 0 : 1);
  if (contrastWith(extremeOf(side), background) < MIN_CONTRAST) {
    side = side === 'dark' ? 'light' : 'dark';
  }

  // 比は比なので、対数の上で寄せる
  const pulledContrast = Math.exp(
    Math.log(seedContrast) +
      PULL_AMOUNT * (Math.log(REFERENCE_CONTRAST) - Math.log(seedContrast)),
  );
  const pulledL = parseOklch(
    findColorWithContrast(
      rotated,
      background,
      backgroundL,
      side,
      pulledContrast,
    ),
  )!.l;
  // 背景から遠ざける向きは、暗い側なら明るさを下げる向き
  const awaySign = side === 'dark' ? -1 : 1;
  const sign = seedContrast >= TOWARD_THRESHOLD ? -awaySign : awaySign;
  const l =
    sign > 0
      ? Math.max(pulledL, rotated.l + MIN_LIGHTNESS_DIFFERENCE)
      : Math.min(pulledL, rotated.l - MIN_LIGHTNESS_DIFFERENCE);
  const result = formatWithLightness(rotated, l);
  return contrastWith(result, background) < MIN_CONTRAST
    ? findColorWithContrast(
        rotated,
        background,
        backgroundL,
        side,
        MIN_CONTRAST,
      )
    : result;
}

function createSubtle(
  rotated: Oklch,
  background: Color,
  backgroundL: number,
): HexColor {
  // 黒の文字の方が読みやすい背景を、明るい背景とみなす（chooseReadableColor と同じ）
  const isLight =
    contrastWith('#000000' as HexColor, background) >=
    contrastWith('#ffffff' as HexColor, background);
  return findColorWithContrast(
    { ...rotated, c: rotated.c * SUBTLE_CHROMA_SCALE },
    background,
    backgroundL,
    isLight ? 'dark' : 'light',
    isLight ? SUBTLE_CONTRAST_ON_LIGHT : SUBTLE_CONTRAST_ON_DARK,
  );
}
