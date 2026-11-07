import type { AbsoluteColor } from '@fringeworks/types';
import { wcagContrast } from 'culori/fn';
import { parseColor } from '../_internal/_color';
import type { ChooseReadableColorOptions } from './types';

const DEFAULT_CANDIDATES = ['#ffffff', '#000000'] as const;

/**
 * 背景の色の上で最も読みやすい色を、候補から選ぶ\
 * WCAG 2 のコントラスト比が最も高い候補を、渡された文字列のまま返す。同じ比なら先の候補を選ぶ
 *
 * `minRatio` を指定すると、候補を順に見て、比が `minRatio` 以上の最初の候補を選ぶ（満たす候補が無ければ、比が最も高い候補）。
 * 白か黒かを選ぶとき、比がわずかに低くても白を使いたい中間の明るさの色（ピンクなど）で使う
 *
 * @param background 背景の色
 * @param candidates 候補の色。読み取れない候補は飛ばす。デフォルトは `['#ffffff', '#000000']`
 * @param options
 * @returns `background` を読み取れない場合と、読み取れる候補が無い場合は `undefined`
 */
export default function chooseReadableColor<
  const C extends AbsoluteColor = (typeof DEFAULT_CANDIDATES)[number],
>(
  background: AbsoluteColor,
  candidates: readonly C[] = DEFAULT_CANDIDATES as readonly AbsoluteColor[] as readonly C[],
  options: ChooseReadableColorOptions = {},
): C | undefined {
  const { minRatio } = options;
  const parsedBackground = parseColor(background);
  if (parsedBackground === undefined) {
    return undefined;
  }
  let chosen: C | undefined;
  let highest = 0;
  for (const candidate of candidates) {
    const parsed = parseColor(candidate);
    if (parsed === undefined) {
      continue;
    }
    const ratio = wcagContrast(parsedBackground, parsed);
    if (minRatio !== undefined && ratio >= minRatio) {
      return candidate;
    }
    if (ratio > highest) {
      chosen = candidate;
      highest = ratio;
    }
  }
  return chosen;
}
