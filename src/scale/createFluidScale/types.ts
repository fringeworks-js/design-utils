import type { CreateFluidValueOptions } from '../createFluidValue';
import type { CreateModularScaleOptions } from '../createModularScale';

export type CreateFluidScaleOptions = CreateFluidValueOptions & {
  /**
   * `minViewport` でのモジュラースケール
   */
  min: Omit<CreateModularScaleOptions, 'decimals'>;

  /**
   * `maxViewport` でのモジュラースケール
   */
  max: Omit<CreateModularScaleOptions, 'decimals'>;
};
