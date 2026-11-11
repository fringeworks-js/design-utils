import scaleByPerfectFifth from './scaleByPerfectFifth';

const RATIO = 3 / 2;

describe('scaleByPerfectFifth', () => {
  it('完全5度の比でexpandする', () => {
    expect(scaleByPerfectFifth(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で完全5度の比で割る', () => {
    expect(scaleByPerfectFifth(100, { mode: 'shrink' })).toBeCloseTo(
      100 / RATIO,
      2,
    );
  });

  it('1の場合', () => {
    expect(scaleByPerfectFifth(1)).toBeCloseTo(RATIO, 2);
  });
});
