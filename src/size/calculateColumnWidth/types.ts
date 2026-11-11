export type CalculateColumnWidthOptions = {
  /**
   * 列の数
   */
  columns: number;

  /**
   * 列の間隔
   */
  gutter: number;

  /**
   * グリッド全体の幅
   */
  containerWidth: number;

  /**
   * 小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
