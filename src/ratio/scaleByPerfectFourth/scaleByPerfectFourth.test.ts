import scaleByPerfectFourth from './scaleByPerfectFourth';

const RATIO = 4 / 3;

describe('scaleByPerfectFourth', () => {
  it('完全4度の比でexpandする', () => {
    expect(scaleByPerfectFourth(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で完全4度の比で割る', () => {
    expect(scaleByPerfectFourth(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByPerfectFourth(1)).toBeCloseTo(RATIO, 2);
  });
});
