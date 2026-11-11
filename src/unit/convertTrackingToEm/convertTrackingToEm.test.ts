import convertTrackingToEm from './convertTrackingToEm';

describe('convertTrackingToEm', () => {
  it('1/1000em を em に変換する', () => {
    expect(convertTrackingToEm(100)).toBe(0.1);
    expect(convertTrackingToEm(-25)).toBe(-0.025);
  });

  it('小数点3桁で丸める', () => {
    expect(convertTrackingToEm(12.5)).toBe(0.013);
    expect(convertTrackingToEm(12.5, { decimals: 4 })).toBe(0.0125);
  });
});
