/**
 * イージング関数\
 * 0〜1 の進行度を受け取り、0〜1 (範囲外も可) の値を返す
 */
export type EasingFunction = (t: number) => number;

export type LinearEasingOptions = {
  /**
   * イージング関数を計算する区間の数
   * @default 100
   */
  samples?: number;

  /**
   * 間引きの許容誤差\
   * 前後の点を直線でつないだときの誤差がこの値以下の点は出力しない。`0` の場合は間引かない
   * @default 0.002
   */
  tolerance?: number;

  /**
   * 小数点以下の桁数
   * @default 3
   */
  decimals?: number;
};
