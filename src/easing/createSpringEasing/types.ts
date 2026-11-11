import type {
  CreateLinearEasingOptions,
  EasingFunction,
} from '../createLinearEasing';

export type CreateSpringEasingOptions = CreateLinearEasingOptions & {
  /**
   * ばねの硬さ\
   * 大きいほど速く動く
   * @default 100
   */
  stiffness?: number;

  /**
   * 減衰の強さ\
   * 小さいほど大きく揺れる
   * @default 10
   */
  damping?: number;

  /**
   * 質量\
   * 大きいほどゆっくり動く
   * @default 1
   */
  mass?: number;

  /**
   * 初速度 (1秒あたりの移動量。全体の移動量を 1 とする)
   * @default 0
   */
  velocity?: number;

  /**
   * 止まるまでの時間を探す上限 (ms)\
   * この時間までに止まらない場合は、この時間で打ち切る (最後に目標の位置へ移る)
   * @default 60000
   */
  maxDuration?: number;
};

export type SpringEasing = {
  /**
   * イージング関数
   */
  easing: EasingFunction;

  /**
   * ばねが止まるまでの時間 (ms)
   */
  duration: number;

  /**
   * CSS の `linear()` の文字列
   */
  css: string;
};
