import type { AbsoluteColor } from '@fringeworks/types';
import type { ColorHarmony } from '../createHarmonyColors/types';

/**
 * アクセントカラーの強さ
 *
 * - `'strong'`: 目立たせる色。プライマリと並べて、別の色として目に留まる
 * - `'subtle'`: 控えめな色。ホバー・選択中の項目の背景など、背景に近い面に使う
 */
export type AccentEmphasis = 'strong' | 'subtle';

export type CreateAccentColorOptions = {
  /**
   * アクセントカラーの強さ
   *
   * - `'strong'`: 目立たせる色。背景との WCAG 2 のコントラスト比を 4.5 以上にし、元の色と明るさを変えて見分けられるようにする
   * - `'subtle'`: 控えめな色。背景に近い面の色（背景とのコントラスト比は、明るい背景で 1.1、暗い背景で 1.3）。その上の文字は、白と黒の読みやすい方（`chooseReadableColor`）にする
   *
   * @default 'strong'
   */
  emphasis?: AccentEmphasis;

  /**
   * アクセントカラーを置く背景の色
   * @default '#ffffff'
   */
  background?: AbsoluteColor;

  /**
   * 元の色から回す、OKLCH の色相の角度（度）。調和の関係の名前でも指定できる。選び方の目安:
   *
   * - 省略（60°）: プライマリと組で使って、なじみつつ目立つ。Material Design 3 の tertiary と同じ角度
   * - `'analogous'`（30°）: プライマリになじむ控えめなアクセントにしたいとき
   * - `'square'`（90°）: 三分割と類似色の間
   * - `'triadic'`（120°）: はっきり違う色にしたいとき
   * - `'splitComplementary'`（150°）: 対比を出しつつ、補色より穏やかにしたいとき
   * - `'complementary'`（180°）: 最も強く対比させたいとき
   *
   * @default 60
   */
  hue?: number | ColorHarmony;
};
