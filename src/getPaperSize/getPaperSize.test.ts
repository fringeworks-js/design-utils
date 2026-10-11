import { PAPER_SIZES } from './constants';
import getPaperSize from './getPaperSize';

describe('getPaperSize', () => {
  it('デフォルトは縦向きの mm', () => {
    expect(getPaperSize('A4')).toEqual({ width: 210, height: 297 });
  });

  it('ISO の B 列と JIS の B 列を区別する', () => {
    expect(getPaperSize('B5')).toEqual({ width: 176, height: 250 });
    expect(getPaperSize('JIS-B5')).toEqual({ width: 182, height: 257 });
  });

  it('orientation: landscape', () => {
    expect(getPaperSize('A4', { orientation: 'landscape' })).toEqual({
      width: 297,
      height: 210,
    });
  });

  it('unit', () => {
    expect(getPaperSize('letter', { unit: 'in' })).toEqual({
      width: 8.5,
      height: 11,
    });
    expect(getPaperSize('A4', { unit: 'px' })).toEqual({
      width: 793.701,
      height: 1122.52,
    });
    expect(getPaperSize('A4', { unit: 'px', decimals: 0 })).toEqual({
      width: 794,
      height: 1123,
    });
  });

  it('すべて縦向きで、次の番号は長辺が前の番号の短辺', () => {
    for (const { width, height } of Object.values(PAPER_SIZES)) {
      expect(width).toBeLessThan(height);
    }
    for (const series of ['A', 'B', 'C', 'JIS-B'] as const) {
      for (let i = 1; i <= 10; i++) {
        const prev =
          PAPER_SIZES[`${series}${i - 1}` as keyof typeof PAPER_SIZES];
        const current =
          PAPER_SIZES[`${series}${i}` as keyof typeof PAPER_SIZES];
        expect(current.height).toBe(prev.width);
      }
    }
  });
});
