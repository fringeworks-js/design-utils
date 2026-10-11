import scaleByDouble from './scaleByDouble';

describe('scaleByDouble', () => {
  it('2倍にする', () => {
    expect(scaleByDouble(100)).toBe(200);
  });

  it('mode: shrink で半分にする', () => {
    expect(scaleByDouble(100, { mode: 'shrink' })).toBe(50);
  });

  it('1の場合', () => {
    expect(scaleByDouble(1)).toBe(2);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect([100].map(scaleByDouble.dataLast())).toEqual([scaleByDouble(100)]);
      expect(scaleByDouble.dataLast({ mode: 'shrink' })(100)).toBe(
        scaleByDouble(100, { mode: 'shrink' }),
      );
    });
  });
});
