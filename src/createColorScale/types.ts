export type ColorScaleOptions = {
  /**
   * 作る段階\
   * `0` が `light`、`baseStep` が元の色、`1000` が `dark` になる
   * @default [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
   */
  steps?: readonly number[];

  /**
   * 元の色をそのまま使う段階
   * @default 500
   */
  baseStep?: number;

  /**
   * `color-mix()` で色を混ぜる色空間
   * @default 'oklch'
   */
  space?: string;

  /**
   * `baseStep` より小さい段階で混ぜる色
   * @default 'white'
   */
  light?: string;

  /**
   * `baseStep` より大きい段階で混ぜる色
   * @default 'black'
   */
  dark?: string;

  /**
   * 割合 (%) の小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
