import round, { DEFAULT_DECIMALS } from '../_internal/round';
import type { CalculateObjectFitOptions, Rect, Size } from './types';

/**
 * `size` を `box` に合わせたときの位置と大きさを返す
 *
 * CSS の `object-fit` / `object-position` と同じ計算をする\
 * canvas への描画や、サムネイルの生成などに使う
 *
 * @param size 合わせる対象の大きさ
 * @param box 合わせる先の大きさ
 * @param options
 * @returns `box` の左上を原点とした位置と大きさ
 */
export default function calculateObjectFit(
  size: Size,
  box: Size,
  options: CalculateObjectFitOptions = {},
): Rect {
  const {
    fit = 'contain',
    positionX = 0.5,
    positionY = 0.5,
    decimals = DEFAULT_DECIMALS,
  } = options;

  const { width, height } = getFittedSize(size, box, fit);
  return {
    x: round((box.width - width) * positionX, decimals),
    y: round((box.height - height) * positionY, decimals),
    width: round(width, decimals),
    height: round(height, decimals),
  };
}

function getFittedSize(
  size: Size,
  box: Size,
  fit: NonNullable<CalculateObjectFitOptions['fit']>,
): Size {
  const containScale = Math.min(
    box.width / size.width,
    box.height / size.height,
  );
  switch (fit) {
    case 'contain':
      return scaleSize(size, containScale);
    case 'cover':
      return scaleSize(
        size,
        Math.max(box.width / size.width, box.height / size.height),
      );
    case 'fill':
      return { width: box.width, height: box.height };
    case 'none':
      return { width: size.width, height: size.height };
    case 'scale-down':
      return scaleSize(size, Math.min(containScale, 1));
    default:
      throw new RangeError(`Unknown fit: ${fit satisfies never}`);
  }
}

function scaleSize(size: Size, scale: number): Size {
  return { width: size.width * scale, height: size.height * scale };
}
