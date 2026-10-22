import { PHOTO_RATIO, scaleByRatio } from '../scaleByRatio';
import type { ScaleByPhotoOptions } from './types';

/**
 * `value` に対して写真の比になる値を返す
 *
 * 写真の比 (3:2 = 1.5)\
 * 35mm フィルムの縦横比
 *
 * - 一眼レフ・ミラーレスカメラの写真の縦横比
 * - 商品写真やギャラリーの表示枠
 *
 * @param value
 * @param options
 * @returns
 */
export default function scaleByPhoto(
  value: number,
  options?: ScaleByPhotoOptions,
) {
  return scaleByRatio(value, PHOTO_RATIO, options);
}
