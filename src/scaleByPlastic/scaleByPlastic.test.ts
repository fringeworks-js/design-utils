import scaleByPlastic from './scaleByPlastic';

const RATIO = 1.324717957244746;

describe('scaleByPlastic', () => {
  it('プラスチック数の比でexpandする', () => {
    expect(scaleByPlastic(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink でプラスチック数の比で割る', () => {
    expect(scaleByPlastic(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleByPlastic(1)).toBeCloseTo(RATIO, 2);
  });
});
