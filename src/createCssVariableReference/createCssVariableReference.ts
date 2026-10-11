import createVariableName from '../_internal/createVariableName';
import type { CreateCssVariableReferenceOptions } from './types';

/**
 * `createCssVariables` と同じ規則で、CSS 変数を参照する `var()` を作る
 *
 * @param path トークンのキーを `.` でつないだもの (`'color.primary'` など)
 * @param options
 * @returns
 */
export default function createCssVariableReference(
  path: string,
  options: CreateCssVariableReferenceOptions = {},
): string {
  const { prefix, separator = '-', fallback } = options;
  const name = createVariableName(path.split('.'), prefix, separator);
  return fallback === undefined ? `var(${name})` : `var(${name}, ${fallback})`;
}
