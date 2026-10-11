import type { CreateCssVariablesOptions } from '../createCssVariables';

export type CreateCssVariableReferenceOptions = Pick<
  CreateCssVariablesOptions,
  'prefix' | 'separator'
> & {
  /**
   * 変数が定義されていない場合の値
   */
  fallback?: string;
};
