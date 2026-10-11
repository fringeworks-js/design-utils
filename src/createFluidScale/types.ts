import type { FluidValueOptions } from '../createFluidValue';
import type { ModularScaleOptions } from '../createModularScale';

export type FluidScaleOptions = FluidValueOptions & {
  /**
   * `minViewport` でのモジュラースケール
   */
  min: Omit<ModularScaleOptions, 'decimals'>;

  /**
   * `maxViewport` でのモジュラースケール
   */
  max: Omit<ModularScaleOptions, 'decimals'>;
};
