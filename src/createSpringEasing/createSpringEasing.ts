import { createLinearEasing } from '../createLinearEasing';
import type { SpringEasing, SpringEasingOptions } from './types';

/**
 * 止まったとみなす、目標の位置からの距離 (全体の移動量を 1 とする)
 */
const REST_DISTANCE = 0.001;

/**
 * 止まるまでの時間を探す上限 (秒)
 */
const MAX_DURATION = 60;

/**
 * 止まるまでの時間を探す間隔 (秒)
 */
const TIME_STEP = 0.001;

/**
 * ばねの物理モデルから、イージング関数・止まるまでの時間・CSS の `linear()` の文字列を作る
 *
 * `duration` を CSS の `transition-duration` や `animation-duration` に指定すると、
 * ばねと同じ速さで動く
 *
 * @param options
 * @returns
 */
export default function createSpringEasing(
  options: SpringEasingOptions = {},
): SpringEasing {
  const {
    stiffness = 100,
    damping = 10,
    mass = 1,
    velocity = 0,
    ...linearEasingOptions
  } = options;

  if (!(stiffness > 0) || !(damping > 0) || !(mass > 0)) {
    throw new RangeError('stiffness, damping and mass must be positive');
  }

  const getDisplacement = createDisplacement(
    stiffness,
    damping,
    mass,
    velocity,
  );

  // 目標の位置からの距離が REST_DISTANCE を超える最後の時刻を探す
  let restTime = 0;
  for (let time = TIME_STEP; time <= MAX_DURATION; time += TIME_STEP) {
    if (Math.abs(getDisplacement(time)) > REST_DISTANCE) restTime = time;
  }
  const duration = Math.ceil(restTime * 1000);
  const seconds = duration / 1000;

  const easing = (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return 1 - getDisplacement(t * seconds);
  };

  return {
    easing,
    duration,
    css: createLinearEasing(easing, linearEasingOptions),
  };
}

/**
 * 時刻 (秒) から、目標の位置までの距離を返す関数を作る\
 * 減衰振動 `m x'' + c x' + k x = 0` を、`x(0) = 1`、`x'(0) = -velocity` で解いたもの
 */
function createDisplacement(
  stiffness: number,
  damping: number,
  mass: number,
  velocity: number,
): (time: number) => number {
  const x0 = 1;
  const v0 = -velocity;
  const omega = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta < 1) {
    // 減衰しながら振動する
    const omegaD = omega * Math.sqrt(1 - zeta * zeta);
    const b = (zeta * omega * x0 + v0) / omegaD;
    return (t) =>
      Math.exp(-zeta * omega * t) *
      (x0 * Math.cos(omegaD * t) + b * Math.sin(omegaD * t));
  }
  if (zeta === 1) {
    // 臨界減衰
    return (t) => Math.exp(-omega * t) * (x0 + (v0 + omega * x0) * t);
  }
  // 過減衰
  const root = omega * Math.sqrt(zeta * zeta - 1);
  const r1 = -zeta * omega + root;
  const r2 = -zeta * omega - root;
  const a = (v0 - r2 * x0) / (r1 - r2);
  const b = x0 - a;
  return (t) => a * Math.exp(r1 * t) + b * Math.exp(r2 * t);
}
