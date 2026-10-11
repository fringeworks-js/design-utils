import createColorScale from './createColorScale';

describe('createColorScale', () => {
  it('デフォルトの段階', () => {
    const scale = createColorScale('var(--brand)');
    expect(Object.keys(scale).map(Number)).toEqual([
      50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
    ]);
    expect(scale[50]).toBe('color-mix(in oklch, var(--brand) 10%, white)');
    expect(scale[400]).toBe('color-mix(in oklch, var(--brand) 80%, white)');
    expect(scale[500]).toBe('var(--brand)');
    expect(scale[600]).toBe('color-mix(in oklch, var(--brand) 80%, black)');
    expect(scale[950]).toBe('color-mix(in oklch, var(--brand) 10%, black)');
  });

  it('オプション', () => {
    const scale = createColorScale('#06c', {
      steps: [100, 300, 900],
      baseStep: 300,
      space: 'srgb',
      light: '#fff',
      dark: '#000',
      decimals: 1,
    });
    expect(scale).toEqual({
      100: 'color-mix(in srgb, #06c 33.3%, #fff)',
      300: '#06c',
      900: 'color-mix(in srgb, #06c 14.3%, #000)',
    });
  });

  it('範囲外の段階は 0% にする', () => {
    const scale = createColorScale('red', { steps: [-100, 1100] });
    expect(scale[-100]).toBe('color-mix(in oklch, red 0%, white)');
    expect(scale[1100]).toBe('color-mix(in oklch, red 0%, black)');
  });
});
