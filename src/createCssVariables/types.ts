/**
 * デザイントークン\
 * オブジェクトの階層が CSS 変数の名前になる
 */
export type DesignTokens = {
  [key: string]: string | number | DesignTokens;
};

export type CreateCssVariablesOptions = {
  /**
   * 変数名の接頭辞
   */
  prefix?: string;

  /**
   * 階層の区切り
   * @default '-'
   */
  separator?: string;

  /**
   * 数値に付ける単位\
   * 指定しない場合は単位を付けない
   */
  unit?: string;
};
