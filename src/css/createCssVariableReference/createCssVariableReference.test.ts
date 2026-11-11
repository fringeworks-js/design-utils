import { createCssVariables } from '../createCssVariables';
import createCssVariableReference from './createCssVariableReference';

describe('createCssVariableReference', () => {
  it('. の区切りを変数名にする', () => {
    expect(createCssVariableReference('color.primary')).toBe(
      'var(--color-primary)',
    );
  });

  it('prefix / separator / fallback', () => {
    expect(
      createCssVariableReference('color.primary', {
        prefix: 'frg',
        separator: '_',
        fallback: '#06c',
      }),
    ).toBe('var(--frg_color_primary, #06c)');
  });

  it('createCssVariables と同じ名前になる', () => {
    const options = { prefix: 'frg' };
    const variables = createCssVariables(
      { color: { text: { muted: '#666' } } },
      options,
    );
    const reference = createCssVariableReference('color.text.muted', options);
    expect(reference).toBe(`var(${Object.keys(variables)[0]})`);
  });
});
