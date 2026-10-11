import type { CssUnit } from '../convertUnit';
import type { PAPER_SIZES } from './constants';

/**
 * 紙のサイズの名前
 */
export type PaperSizeName = keyof typeof PAPER_SIZES;

export type GetPaperSizeOptions = {
  /**
   * 向き
   * @default 'portrait'
   */
  orientation?: 'portrait' | 'landscape';

  /**
   * 単位
   * @default 'mm'
   */
  unit?: CssUnit;

  /**
   * 小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
