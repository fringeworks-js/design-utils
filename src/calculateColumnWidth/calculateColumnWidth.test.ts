import calculateColumnWidth from './calculateColumnWidth';

const grid = { columns: 12, gutter: 24, containerWidth: 1128 };

describe('calculateColumnWidth', () => {
  it('span 列分の幅を返す', () => {
    expect(calculateColumnWidth(1, grid)).toBe(72);
    expect(calculateColumnWidth(4, grid)).toBe(360);
    expect(calculateColumnWidth(12, grid)).toBe(1128);
  });

  it('小数点3桁で丸める', () => {
    const options = { columns: 3, gutter: 0, containerWidth: 100 };
    expect(calculateColumnWidth(1, options)).toBe(33.333);
    expect(calculateColumnWidth(1, { ...options, decimals: 0 })).toBe(33);
  });

  it('列の間隔が 0 の場合は等分する', () => {
    const options = { columns: 4, gutter: 0, containerWidth: 960 };
    expect(calculateColumnWidth(1, options)).toBe(240);
    expect(calculateColumnWidth(3, options)).toBe(720);
  });

  it('列が1つの場合はグリッド全体の幅', () => {
    const options = { columns: 1, gutter: 24, containerWidth: 960 };
    expect(calculateColumnWidth(1, options)).toBe(960);
  });

  it('span が 0 以下の場合は 0', () => {
    expect(calculateColumnWidth(0, grid)).toBe(0);
    expect(calculateColumnWidth(-1, grid)).toBe(0);
  });
});
