/**
 * 大きさ
 */
export type Size = {
  width: number;
  height: number;
};

/**
 * 位置と大きさ
 */
export type Rect = Size & {
  x: number;
  y: number;
};

export type CalculateObjectFitOptions = {
  /**
   * 合わせ方 (CSS の `object-fit` と同じ)
   * - `contain`: 縦横比を保ち、`box` に収まる最大の大きさにする
   * - `cover`: 縦横比を保ち、`box` を覆う最小の大きさにする
   * - `fill`: `box` と同じ大きさにする
   * - `none`: 元の大きさのままにする
   * - `scale-down`: `none` と `contain` のうち小さいほうにする
   *
   * @default 'contain'
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /**
   * 横方向の配置 (0〜1)\
   * `0` で左端、`1` で右端にそろえる (`object-position` の割合に相当)
   * @default 0.5
   */
  positionX?: number;

  /**
   * 縦方向の配置 (0〜1)\
   * `0` で上端、`1` で下端にそろえる (`object-position` の割合に相当)
   * @default 0.5
   */
  positionY?: number;

  /**
   * 小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
