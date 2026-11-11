import createCssVariables from './createCssVariables';

describe('createCssVariables', () => {
  it('階層のキーをつないで変数名にする', () => {
    expect(
      createCssVariables({
        color: { primary: '#06c', text: { muted: '#666' } },
        radius: 4,
      }),
    ).toEqual({
      '--color-primary': '#06c',
      '--color-text-muted': '#666',
      '--radius': '4',
    });
  });

  it('prefix と separator', () => {
    expect(
      createCssVariables(
        { color: { primary: '#06c' } },
        { prefix: 'frg', separator: '_' },
      ),
    ).toEqual({ '--frg_color_primary': '#06c' });
  });

  it('unit は数値にだけ付ける', () => {
    expect(
      createCssVariables({ space: { s: 8, m: '1rem' } }, { unit: 'px' }),
    ).toEqual({ '--space-s': '8px', '--space-m': '1rem' });
  });
});
