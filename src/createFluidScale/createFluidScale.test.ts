import { createFluidValue } from '../createFluidValue';
import createFluidScale from './createFluidScale';

describe('createFluidScale', () => {
  it('段階ごとに clamp() を返す', () => {
    const scale = createFluidScale({
      min: { base: 16, ratio: 1.2 },
      max: { base: 20, ratio: 1.25 },
    });
    expect(scale(0)).toBe(createFluidValue(16, 20));
    expect(scale(1)).toBe(createFluidValue(19.2, 25));
    expect(scale(-1)).toBe(createFluidValue(16 / 1.2, 16));
  });

  it('createFluidValue のオプションを渡す', () => {
    const scale = createFluidScale({
      min: { base: 16, ratio: 2 },
      max: { base: 16, ratio: 3 },
      unit: 'px',
      minViewport: 400,
      maxViewport: 1200,
    });
    expect(scale(1)).toBe('clamp(32px, 24px + 2vw, 48px)');
  });
});
