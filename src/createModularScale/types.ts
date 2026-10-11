export type ModularScaleOptions = {
  /**
   * 基準値\
   * 配列の場合は、複数の基準値を組み合わせたスケール (double stranded) になる
   * @default 16
   */
  base?: number | readonly number[];

  /**
   * 比率
   * @default GOLDEN_RATIO
   */
  ratio?: number;

  /**
   * 小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
