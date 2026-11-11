/**
 * CSS の長さの単位
 */
export type CssUnit =
  'px' | 'rem' | 'em' | 'pt' | 'pc' | 'in' | 'cm' | 'mm' | 'Q';

export type ConvertUnitOptions = {
  /**
   * `rem` の基準になる文字サイズ (px)
   * @default 16
   */
  rootFontSize?: number;

  /**
   * `em` の基準になる文字サイズ (px)
   * @default rootFontSize
   */
  fontSize?: number;

  /**
   * 小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
