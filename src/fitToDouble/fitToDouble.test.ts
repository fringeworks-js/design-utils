import fitToDouble from './fitToDouble';

describe('fitToDouble', () => {
  it('2倍にする', () => {
    expect(fitToDouble(100)).toBe(200);
  });

  it('mode: shrink で半分にする', () => {
    expect(fitToDouble(100, { mode: 'shrink' })).toBe(50);
  });

  it('1の場合', () => {
    expect(fitToDouble(1)).toBe(2);
  });
});
