import round from './_round';

describe('round', () => {
  it('指定の桁数に丸める', () => {
    expect(round(1.23456, 2)).toBe(1.23);
    expect(round(1.5, 0)).toBe(2);
  });

  it('-0 を 0 にする', () => {
    expect(Object.is(round(-0.0001, 2), 0)).toBe(true);
  });

  it('範囲外の桁数は 0〜100 に収める', () => {
    expect(round(1.5, -1)).toBe(2);
    expect(round(1 / 3, 101)).toBe(round(1 / 3, 100));
    expect(round(1 / 3, Infinity)).toBe(round(1 / 3, 100));
  });

  it('小数の桁数は切り捨てる', () => {
    expect(round(1.23456, 2.9)).toBe(1.23);
  });

  it('NaN の桁数は既定値にする', () => {
    expect(round(1.23456, NaN)).toBe(1.235);
  });
});
