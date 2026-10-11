import { createLinearEasing } from '../createLinearEasing';
import createSpringEasing from './createSpringEasing';

describe('createSpringEasing', () => {
  it('0 から始まり 1 で終わる', () => {
    const { easing } = createSpringEasing();
    expect(easing(0)).toBe(0);
    expect(easing(1)).toBe(1);
  });

  it('デフォルトは目標を越えて揺れる', () => {
    const { easing } = createSpringEasing();
    const values = Array.from({ length: 101 }, (_, i) => easing(i / 100));
    expect(Math.max(...values)).toBeGreaterThan(1.1);
  });

  it('duration は止まるまでの時間 (ms)', () => {
    // 減衰の包絡線 e^(-ζωt) が 0.001 を下回るまでの時間に近い
    const { duration } = createSpringEasing();
    expect(duration).toBeGreaterThan(1000);
    expect(duration).toBeLessThan(1500);
    expect(Number.isInteger(duration)).toBe(true);
  });

  it('duration の後半は目標の近くにいる', () => {
    const { easing } = createSpringEasing();
    for (let i = 95; i <= 100; i++) {
      expect(Math.abs(easing(i / 100) - 1)).toBeLessThan(0.01);
    }
  });

  it('臨界減衰・過減衰は目標を越えない', () => {
    for (const damping of [20, 40]) {
      const { easing } = createSpringEasing({ damping });
      for (let i = 0; i <= 100; i++) {
        expect(easing(i / 100)).toBeLessThanOrEqual(1);
      }
    }
  });

  it('硬いほど duration が短い', () => {
    const soft = createSpringEasing({ stiffness: 100, damping: 20 });
    const hard = createSpringEasing({ stiffness: 400, damping: 40 });
    expect(hard.duration).toBeLessThan(soft.duration);
  });

  it('初速度があると早く進む', () => {
    const still = createSpringEasing({ damping: 20 });
    const moving = createSpringEasing({ damping: 20, velocity: 10 });
    // 同じ時刻 (50ms) での位置を比べる
    const time = 50;
    expect(moving.easing(time / moving.duration)).toBeGreaterThan(
      still.easing(time / still.duration),
    );
  });

  it('css は easing を createLinearEasing で変換したもの', () => {
    const options = { samples: 50, tolerance: 0.01, decimals: 2 };
    const { easing, css } = createSpringEasing(options);
    expect(css).toBe(createLinearEasing(easing, options));
  });

  it('stiffness / damping / mass が正の数でなければエラー', () => {
    expect(() => createSpringEasing({ stiffness: 0 })).toThrow(RangeError);
    expect(() => createSpringEasing({ damping: 0 })).toThrow(RangeError);
    expect(() => createSpringEasing({ mass: -1 })).toThrow(RangeError);
  });
});
