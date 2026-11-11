/**
 * 色相環の上での、色の調和の関係
 *
 * - `'analogous'`: 類似色（30°・330°）
 * - `'complementary'`: 補色（180°）
 * - `'splitComplementary'`: 分裂補色（150°・210°）
 * - `'triadic'`: 三分割（120°・240°）
 * - `'square'`: 四分割（90°・180°・270°）
 */
export type ColorHarmony =
  'analogous' | 'complementary' | 'splitComplementary' | 'triadic' | 'square';

export type CreateHarmonyColorsOptions = {
  /**
   * 調和の関係。選び方の目安:
   *
   * - `'analogous'`（類似色。0°・30°・330°）: なじませたい、落ち着いた統一感を出したいとき。色によっては見分けにくいので、区別が要る用途には向かない
   * - `'complementary'`（補色。0°・180°）: 2色をはっきり対比させたいとき。赤と緑のように、色覚の多様性で見分けにくい組み合わせになることがある
   * - `'splitComplementary'`（分裂補色。0°・150°・210°）: 対比を出しつつ、補色より穏やかにしたいとき
   * - `'triadic'`（三分割。0°・120°・240°）: 3つのものを見分けたいとき（グラフの系列、カテゴリーの色分けなど）
   * - `'square'`（四分割。0°・90°・180°・270°）: 4つのものを見分けたいとき。にぎやかになりやすいので、1色を主にし、ほかは控えめに使う
   *
   * @default 'triadic'
   */
  harmony?: ColorHarmony;
};
