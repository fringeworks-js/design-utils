import createVariableName from '../_internal/createVariableName';
import type { CreateCssVariablesOptions, DesignTokens } from './types';

/**
 * デザイントークンから CSS 変数のオブジェクトを作る
 *
 * 戻り値は React の `style` にそのまま渡せる\
 * 階層のキーを `separator` でつないだものが変数名になる
 *
 * @param tokens デザイントークン
 * @param options
 * @returns
 */
export default function createCssVariables(
  tokens: DesignTokens,
  options: CreateCssVariablesOptions = {},
): Record<`--${string}`, string> {
  const { prefix, separator = '-', unit } = options;
  const result: Record<`--${string}`, string> = {};

  const visit = (value: DesignTokens[string], path: string[]) => {
    if (typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        visit(child, [...path, key]);
      }
    } else {
      const name = createVariableName(path, prefix, separator);
      result[name] =
        typeof value === 'number' && unit ? `${value}${unit}` : String(value);
    }
  };
  visit(tokens, []);

  return result;
}
