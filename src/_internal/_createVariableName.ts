/**
 * CSS 変数の名前を作る
 * @param path 階層ごとのキー
 * @param prefix 接頭辞
 * @param separator 階層の区切り
 * @returns
 */
export default function createVariableName(
  path: readonly string[],
  prefix: string | undefined,
  separator: string,
): `--${string}` {
  const names = prefix ? [prefix, ...path] : path;
  return `--${names.join(separator)}`;
}
