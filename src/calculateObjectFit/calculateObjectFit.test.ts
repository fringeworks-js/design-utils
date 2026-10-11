import calculateObjectFit from './calculateObjectFit';

const landscape = { width: 400, height: 200 };
const box = { width: 300, height: 300 };

describe('calculateObjectFit', () => {
  it('デフォルトは contain で中央に配置する', () => {
    expect(calculateObjectFit(landscape, box)).toEqual({
      x: 0,
      y: 75,
      width: 300,
      height: 150,
    });
  });

  it('cover', () => {
    expect(calculateObjectFit(landscape, box, { fit: 'cover' })).toEqual({
      x: -150,
      y: 0,
      width: 600,
      height: 300,
    });
  });

  it('fill', () => {
    expect(calculateObjectFit(landscape, box, { fit: 'fill' })).toEqual({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
    });
  });

  it('none', () => {
    expect(calculateObjectFit(landscape, box, { fit: 'none' })).toEqual({
      x: -50,
      y: 50,
      width: 400,
      height: 200,
    });
  });

  describe('scale-down', () => {
    it('box より大きい場合は contain', () => {
      expect(calculateObjectFit(landscape, box, { fit: 'scale-down' })).toEqual(
        calculateObjectFit(landscape, box),
      );
    });

    it('box より小さい場合は none', () => {
      expect(
        calculateObjectFit({ width: 100, height: 50 }, box, {
          fit: 'scale-down',
        }),
      ).toEqual({ x: 100, y: 125, width: 100, height: 50 });
    });
  });

  it('positionX / positionY', () => {
    expect(
      calculateObjectFit(landscape, box, {
        fit: 'cover',
        positionX: 0,
        positionY: 1,
      }),
    ).toEqual({ x: 0, y: 0, width: 600, height: 300 });
    expect(calculateObjectFit(landscape, box, { positionY: 1 })).toEqual({
      x: 0,
      y: 150,
      width: 300,
      height: 150,
    });
  });

  it('小数点3桁で丸める', () => {
    expect(
      calculateObjectFit({ width: 3, height: 1 }, { width: 100, height: 100 }),
    ).toEqual({ x: 0, y: 33.333, width: 100, height: 33.333 });
  });
});
