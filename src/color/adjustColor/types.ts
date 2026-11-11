export type AdjustColorOptions = {
  /**
   * OKLCH の明るさ（0〜1）に足す値。負の数で暗くする
   * @default 0
   */
  lightness?: number;

  /**
   * OKLCH の彩度（0 以上。sRGB の色はおよそ 0.37 まで）に足す値。負の数で彩度を下げる
   * @default 0
   */
  chroma?: number;

  /**
   * OKLCH の色相に足す角度（度）
   * @default 0
   */
  hue?: number;
};
