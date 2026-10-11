export type MediaQueryOptions = {
  /**
   * 作るクエリーの種類
   * - `media`: `@media`
   * - `container`: `@container`
   *
   * @default 'media'
   */
  type?: 'media' | 'container';

  /**
   * 出力の単位\
   * `em` は 16px を 1em として換算する
   * @default 'px'
   */
  unit?: 'px' | 'em';

  /**
   * 条件の書き方
   * - `range`: 範囲の構文 (`(width >= 768px)`)
   * - `min-max`: `min-width` / `max-width` (`(min-width: 768px)`)\
   *   範囲の構文に対応していないブラウザー向け。上限は 0.02px 小さい値にする
   *
   * @default 'range'
   */
  syntax?: 'range' | 'min-max';
};

/**
 * ブレークポイントからクエリーを作る関数
 */
export type MediaQuery<K extends string = string> = {
  /**
   * `name` の幅以上
   */
  up(name: K): string;

  /**
   * `name` の幅未満
   */
  down(name: K): string;

  /**
   * `min` の幅以上、`max` の幅未満
   */
  between(min: K, max: K): string;

  /**
   * `name` の幅以上、次に大きいブレークポイントの幅未満\
   * 一番大きいブレークポイントの場合は `up` と同じ
   */
  only(name: K): string;
};
