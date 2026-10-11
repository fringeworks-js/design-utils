import createFluidValue from './createFluidValue';

describe('createFluidValue', () => {
  it('デフォルトは rem と vw', () => {
    expect(createFluidValue(16, 24)).toBe(
      'clamp(1rem, 0.793rem + 0.884vw, 1.5rem)',
    );
  });

  it('min > max の場合は幅が広がるほど小さくなる', () => {
    expect(
      createFluidValue(32, 16, { minViewport: 400, maxViewport: 1200 }),
    ).toBe('clamp(1rem, 2.5rem - 2vw, 2rem)');
  });

  it('min と max が同じ場合はその値', () => {
    expect(createFluidValue(16, 16)).toBe('1rem');
  });

  it('unit: px', () => {
    expect(
      createFluidValue(16, 32, {
        unit: 'px',
        minViewport: 400,
        maxViewport: 1200,
      }),
    ).toBe('clamp(16px, 8px + 2vw, 32px)');
  });

  it('切片が負の場合', () => {
    expect(
      createFluidValue(16, 48, { minViewport: 800, maxViewport: 1200 }),
    ).toBe('clamp(1rem, -3rem + 8vw, 3rem)');
  });

  it('rootFontSize と relativeTo', () => {
    expect(
      createFluidValue(20, 40, {
        rootFontSize: 10,
        relativeTo: 'container',
        minViewport: 400,
        maxViewport: 1200,
      }),
    ).toBe('clamp(2rem, 1rem + 2.5cqi, 4rem)');
  });

  it('minViewport と maxViewport が同じならエラー', () => {
    expect(() =>
      createFluidValue(16, 24, { minViewport: 800, maxViewport: 800 }),
    ).toThrow(RangeError);
  });
});
