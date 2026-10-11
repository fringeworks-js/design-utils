import type {
  EasingFunction,
  LinearEasingOptions,
} from '../createLinearEasing';

export type SpringEasingOptions = LinearEasingOptions & {
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
