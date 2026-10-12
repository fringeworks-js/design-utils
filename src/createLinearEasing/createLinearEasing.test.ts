import createLinearEasing from './createLinearEasing';

/**
 * linear() の文字列を、指定の進行度での値に戻す
 */
function evaluateLinear(css: string, t: number) {
  const items = css
    .slice('linear('.length, -1)
    .split(', ')
    .map((item) => item.split(' '));
  const points = items.map(([value, position], i) => ({
    value: Number(value),
    position:
      position === undefined
        ? i / (items.length - 1)
        : Number(position.slice(0, -1)) / 100,
  }));
  const index = points.findIndex((point) => point.position >= t);
  if (index <= 0) return points[0]!.value;
  const a = points[index - 1]!;
  const b = points[index]!;
  return (
    a.value +
    ((b.value - a.value) * (t - a.position)) / (b.position - a.position)
  );
}

const easeInQuad = (t: number) => t * t;
const easeOutBounce = (t: number) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
};

describe('createLinearEasing', () => {
  it('直線は最初と最後の点だけになる', () => {
    expect(createLinearEasing((t) => t)).toBe('linear(0, 1)');
  });

  it('間引いた点には位置を付ける', () => {
    expect(createLinearEasing(easeInQuad, { samples: 4, tolerance: 0.1 })).toBe(
      'linear(0, 0.25 50%, 1)',
    );
  });

  it('tolerance: 0 では間引かず、位置を省略する', () => {
    expect(createLinearEasing(easeInQuad, { samples: 4, tolerance: 0 })).toBe(
      'linear(0, 0.063, 0.25, 0.563, 1)',
    );
  });

  it('decimals', () => {
    expect(
      createLinearEasing(easeInQuad, {
        samples: 4,
        tolerance: 0,
        decimals: 4,
      }),
    ).toBe('linear(0, 0.0625, 0.25, 0.5625, 1)');
  });

  it.each([
    ['easeInQuad', easeInQuad],
    ['easeOutBounce', easeOutBounce],
  ])('%s: 元の関数との誤差が小さい', (_, easing) => {
    const css = createLinearEasing(easing);
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      expect(Math.abs(evaluateLinear(css, t) - easing(t))).toBeLessThan(0.005);
    }
  });

  it('samples が正の整数でなければエラー', () => {
    expect(() => createLinearEasing(easeInQuad, { samples: 0 })).toThrow(
      RangeError,
    );
    expect(() => createLinearEasing(easeInQuad, { samples: 1.5 })).toThrow(
      RangeError,
    );
  });
});
