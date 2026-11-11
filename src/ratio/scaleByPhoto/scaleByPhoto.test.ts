import scaleByPhoto from './scaleByPhoto';

const RATIO = 3 / 2;

describe('scaleByPhoto', () => {
  it('写真の比でexpandする', () => {
    expect(scaleByPhoto(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で写真の比で割る', () => {
    expect(scaleByPhoto(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleByPhoto(1)).toBeCloseTo(RATIO, 2);
  });
});
