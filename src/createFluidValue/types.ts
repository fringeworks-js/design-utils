export type FluidValueOptions = {
  /**
   * `min` になる幅 (px)
   * @default 375
   */
  minViewport?: number;

  /**
   * `max` になる幅 (px)
   * @default 1280
   */
  maxViewport?: number;

  /**
   * 出力の単位
   * @default 'rem'
   */
  unit?: 'px' | 'rem';

  /**
   * `rem` の基準になる文字サイズ (px)
   * @default 16
   */
  rootFontSize?: number;

  /**
   * 幅の基準
   * - `viewport`: ビューポートの幅 (`vw`)
   * - `container`: コンテナーのインライン方向の幅 (`cqi`)
   *
   * @default 'viewport'
   */
  relativeTo?: 'viewport' | 'container';

  /**
   * 小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
