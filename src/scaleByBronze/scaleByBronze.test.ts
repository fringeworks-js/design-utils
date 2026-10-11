import scaleByBronze from './scaleByBronze';

const RATIO = (3 + Math.sqrt(13)) / 2;

describe('scaleByBronze', () => {
  it('青銅比でexpandする', () => {
    expect(scaleByBronze(100)).toBeCloseTo(100 * RATIO, 2);
  });

  it('mode: shrink で青銅比で割る', () => {
    expect(scaleByBronze(100, { mode: 'shrink' })).toBeCloseTo(100 / RATIO, 2);
  });

  it('1の場合', () => {
    expect(scaleByBronze(1)).toBeCloseTo(RATIO, 2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleByBronze.dataLast())).toEqual([scaleByBronze(100)]);
      expect(scaleByBronze.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleByBronze(100, { mode: 'shrink' }),
      );
    });
  });
});
