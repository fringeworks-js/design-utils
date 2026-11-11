export type ChooseReadableColorOptions = {
  /**
   * 満たせば選ぶコントラスト比。指定すると、候補を順に見て、比がこの値以上の最初の候補を選ぶ（満たす候補が無ければ、比が最も高い候補）。
   * 省略すると、比が最も高い候補を選ぶ
   */
  minRatio?: number;
};
