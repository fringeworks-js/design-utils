# @fringeworks/design-utils

`@fringeworks/design-utils` is a library some will find handy, offering design utilities that also work in Node.js, such as size calculations based on design ratios and helpers for CSS values.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```bash
npm install @fringeworks/design-utils
# or
pnpm add @fringeworks/design-utils
```

## Usage

Functions, types, and constants can be imported by the same name from the root or from a per-function path. A per-function path also provides its function as the default export.

```ts
import { scaleByGolden } from '@fringeworks/design-utils';
import scaleByGolden from '@fringeworks/design-utils/scaleByGolden';
```

Nothing depends on the DOM, so you can also use it to generate design tokens at build time or on the server.

### Data Last

Functions with `dataLast` take every argument except the data first and return a function that receives the data. This is useful in pipelines and as a callback for methods such as `Array.prototype.map`. Functions that have `dataLast` show it alongside their signatures.

```ts
const fn = scaleByRatio.dataLast(16 / 9, { mode: 'shrink' });
```

### Decimal places

Functions that return numbers, or strings that contain numbers, round their results with the `decimals` option. Every function defaults to 3 decimal places.

### Browser support of the generated CSS

Some generated values only work in relatively recent browsers, such as `cqi` from `createFluidValue`, the range syntax from `createMediaQuery`, `color-mix()` from `createColorScale`, and `linear()` from `createLinearEasing`. Check that the generated values work in the browsers you target. When a function has an option for a syntax that older browsers support, its description says so.

---

## API

### Ratios

| Function                               | Description                                            |
| -------------------------------------- | ------------------------------------------------------ |
| `scaleByRatio(value, ratio, options?)` | Returns a value multiplied (or divided) by a ratio     |
| `scaleByBronze(value, options?)`       | Returns the value at the bronze ratio (≈ 3.303)        |
| `scaleByDouble(value, options?)`       | Returns the value at 1:2                               |
| `scaleByGolden(value, options?)`       | Returns the value at the golden ratio (≈ 1.618)        |
| `scaleByHarmonic(value, options?)`     | Returns the value at the harmonic ratio (4:3 ≈ 1.333)  |
| `scaleByPlatinum(value, options?)`     | Returns the value at the platinum ratio (≈ 1.325)      |
| `scaleBySilver(value, options?)`       | Returns the value at the silver ratio (1 + √2 ≈ 2.414) |
| `scaleBySqrt2(value, options?)`        | Returns the value at the √2 ratio (≈ 1.414)            |
| `scaleBySqrt3(value, options?)`        | Returns the value at the √3 ratio (≈ 1.732)            |
| `scaleBySqrt5(value, options?)`        | Returns the value at the √5 ratio (≈ 2.236)            |
| `scaleByYamato(value, options?)`       | Returns the value at the Yamato ratio (same as √2)     |

#### `scaleByRatio`

```ts
scaleByRatio(value: number, ratio: number, options?: ScaleByRatioOptions): number
scaleByRatio.dataLast(ratio: number, options?: ScaleByRatioOptions): (value: number) => number
```

Returns the value that is in the ratio `ratio` to `value`. By default, this is `value × ratio`.

```ts
scaleByRatio(100, 16 / 9); // 177.778
scaleByRatio(100, 16 / 9, { mode: 'shrink' }); // 56.25
```

| Option      | Type                   | Description                                                                      |
| ----------- | ---------------------- | -------------------------------------------------------------------------------- |
| `mode?`     | `'expand' \| 'shrink'` | `'expand'`: `value × ratio`, `'shrink'`: `value ÷ ratio`. Defaults to `'expand'` |
| `decimals?` | `number`               | Number of decimal places. Defaults to `3`                                        |

#### Per-ratio functions

```ts
scaleByBronze(value: number, options?: ScaleByRatioOptions): number
scaleByBronze.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleByDouble(value: number, options?: ScaleByRatioOptions): number
scaleByDouble.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleByGolden(value: number, options?: ScaleByRatioOptions): number
scaleByGolden.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleByHarmonic(value: number, options?: ScaleByRatioOptions): number
scaleByHarmonic.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleByPlatinum(value: number, options?: ScaleByRatioOptions): number
scaleByPlatinum.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleBySilver(value: number, options?: ScaleByRatioOptions): number
scaleBySilver.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleBySqrt2(value: number, options?: ScaleByRatioOptions): number
scaleBySqrt2.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleBySqrt3(value: number, options?: ScaleByRatioOptions): number
scaleBySqrt3.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleBySqrt5(value: number, options?: ScaleByRatioOptions): number
scaleBySqrt5.dataLast(options?: ScaleByRatioOptions): (value: number) => number
scaleByYamato(value: number, options?: ScaleByRatioOptions): number
scaleByYamato.dataLast(options?: ScaleByRatioOptions): (value: number) => number
```

Call `scaleByRatio` with ratios that are common in design and architecture. The options are the same as for `scaleByRatio`.

```ts
scaleByGolden(100); // 161.803
scaleByGolden(100, { mode: 'shrink' }); // 61.803
```

#### Constants

| Constant         | Description                              |
| ---------------- | ---------------------------------------- |
| `GOLDEN_RATIO`   | The golden ratio (≈ 1.618)               |
| `SILVER_RATIO`   | The silver ratio (1 + √2 ≈ 2.414)        |
| `BRONZE_RATIO`   | The bronze ratio (≈ 3.303)               |
| `PLATINUM_RATIO` | The platinum ratio (≈ 1.325)             |
| `SQRT2_RATIO`    | The √2 ratio (≈ 1.414)                   |
| `SQRT3_RATIO`    | The √3 ratio (≈ 1.732)                   |
| `SQRT5_RATIO`    | The √5 ratio (≈ 2.236)                   |
| `YAMATO_RATIO`   | The Yamato ratio (same as `SQRT2_RATIO`) |
| `HARMONIC_RATIO` | The harmonic ratio (4:3 ≈ 1.333)         |
| `DOUBLE_RATIO`   | 1:2                                      |

#### Types

| Type                                                                                                                                                                                                                                            | Description                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `ScaleByRatioOptions`                                                                                                                                                                                                                           | Options for `scaleByRatio`    |
| `ScaleByBronzeOptions`, `ScaleByDoubleOptions`, `ScaleByGoldenOptions`, `ScaleByHarmonicOptions`, `ScaleByPlatinumOptions`, `ScaleBySilverOptions`, `ScaleBySqrt2Options`, `ScaleBySqrt3Options`, `ScaleBySqrt5Options`, `ScaleByYamatoOptions` | Same as `ScaleByRatioOptions` |

### Units

| Function                                                  | Description                                                |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| `convertUnit(value, from, to, options?)`                  | Converts between CSS length units (including `Q`)          |
| `convertTrackingToEm(tracking, options?)`                 | Converts tracking (1/1000 em) to `em` for `letter-spacing` |
| `convertLeadingToLineHeight(leading, fontSize, options?)` | Converts leading to a unitless `line-height`               |

#### `convertUnit`

```ts
convertUnit(value: number, from: CssUnit, to: CssUnit, options?: ConvertUnitOptions): number
convertUnit.dataLast(from: CssUnit, to: CssUnit, options?: ConvertUnitOptions): (value: number) => number
```

Converts between CSS length units. Absolute units follow the CSS definition (1in = 96px = 72pt). `Q` is a quarter millimeter, so you can convert type sizes and letter feeds from Japanese phototypesetting and DTP (kyu and ha) to CSS values.

```ts
convertUnit(24, 'px', 'rem'); // 1.5
convertUnit(13, 'Q', 'pt'); // 9.213
[12, 24].map(convertUnit.dataLast('px', 'rem')); // [0.75, 1.5]
```

| Option          | Type     | Description                                                      |
| --------------- | -------- | ---------------------------------------------------------------- |
| `rootFontSize?` | `number` | Font size (px) that `rem` is based on. Defaults to `16`          |
| `fontSize?`     | `number` | Font size (px) that `em` is based on. Defaults to `rootFontSize` |
| `decimals?`     | `number` | Number of decimal places. Defaults to `3`                        |

#### `convertTrackingToEm`

```ts
convertTrackingToEm(tracking: number, options?: ConvertTrackingToEmOptions): number
```

Converts tracking (1/1000 em) from tools such as Illustrator and InDesign to an `em` value for CSS `letter-spacing`.

```ts
convertTrackingToEm(100); // 0.1
```

| Option      | Type     | Description                               |
| ----------- | -------- | ----------------------------------------- |
| `decimals?` | `number` | Number of decimal places. Defaults to `3` |

#### `convertLeadingToLineHeight`

```ts
convertLeadingToLineHeight(leading: number, fontSize: number, options?: ConvertLeadingToLineHeightOptions): number
```

Converts leading (the distance between lines, including the font size) to a unitless `line-height`. Specify `leading` and `fontSize` in the same unit. Use `convertUnit` to match units if they differ.

```ts
convertLeadingToLineHeight(24, 16); // 1.5
```

| Option      | Type     | Description                               |
| ----------- | -------- | ----------------------------------------- |
| `decimals?` | `number` | Number of decimal places. Defaults to `3` |

#### Types

| Type                                | Description                                                            |
| ----------------------------------- | ---------------------------------------------------------------------- |
| `CssUnit`                           | `'px' \| 'rem' \| 'em' \| 'pt' \| 'pc' \| 'in' \| 'cm' \| 'mm' \| 'Q'` |
| `ConvertUnitOptions`                | Options for `convertUnit`                                              |
| `ConvertTrackingToEmOptions`        | Options for `convertTrackingToEm`                                      |
| `ConvertLeadingToLineHeightOptions` | Options for `convertLeadingToLineHeight`                               |

### Scales

| Function                               | Description                                                         |
| -------------------------------------- | ------------------------------------------------------------------- |
| `createModularScale(options?)`         | Creates a modular scale function                                    |
| `createFluidValue(min, max, options?)` | Creates a `clamp()` string for a value that changes with the width  |
| `createFluidScale(options)`            | Creates a scale function whose base and ratio change with the width |

#### `createModularScale`

```ts
createModularScale(options?: ModularScaleOptions): (step: number) => number
```

Creates a modular scale function. The returned function takes a step and returns `base × ratio ^ step`.

If `base` is an array, the scale combines multiple bases (double stranded). The scales from each base are merged into one, and steps are assigned in ascending order, with the first value of `base` as step `0`.

```ts
const scale = createModularScale({ ratio: HARMONIC_RATIO });
scale(0); // 16
scale(2); // 28.444
scale(-1); // 12

const double = createModularScale({ base: [16, 24], ratio: 2 });
[0, 1, 2, 3].map(double); // [16, 24, 32, 48]
```

| Option      | Type                          | Description                                                                       |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------- |
| `base?`     | `number \| readonly number[]` | Base value. An array combines multiple bases. Defaults to `16`                    |
| `ratio?`    | `number`                      | Ratio. Must be greater than 1 when `base` is an array. Defaults to `GOLDEN_RATIO` |
| `decimals?` | `number`                      | Number of decimal places. Defaults to `3`                                         |

#### `createFluidValue`

```ts
createFluidValue(min: number, max: number, options?: FluidValueOptions): string
```

Returns a CSS `clamp()` string for a value that changes from `min` to `max` with the width of the viewport (or container). `min` and `max` are in px, so you can use the values from a design comp as they are. If `min` is greater than `max`, the value gets smaller as the width grows.

When the output unit is `rem`, the browser's font size setting is respected.

```ts
createFluidValue(16, 24); // 'clamp(1rem, 0.793rem + 0.884vw, 1.5rem)'
createFluidValue(16, 32, { unit: 'px', minViewport: 400, maxViewport: 1200 });
// 'clamp(16px, 8px + 2vw, 32px)'
```

| Option          | Type                        | Description                                                                                                   |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `minViewport?`  | `number`                    | Width (px) at which the value is `min`. Defaults to `375`                                                     |
| `maxViewport?`  | `number`                    | Width (px) at which the value is `max`. Defaults to `1280`                                                    |
| `unit?`         | `'px' \| 'rem'`             | Output unit. Defaults to `'rem'`                                                                              |
| `rootFontSize?` | `number`                    | Font size (px) that `rem` is based on. Defaults to `16`                                                       |
| `relativeTo?`   | `'viewport' \| 'container'` | `'viewport'`: the viewport width (`vw`), `'container'`: the container width (`cqi`). Defaults to `'viewport'` |
| `decimals?`     | `number`                    | Number of decimal places. Defaults to `3`                                                                     |

#### `createFluidScale`

```ts
createFluidScale(options: FluidScaleOptions): (step: number) => string
```

Combines `createModularScale` and `createFluidValue` to create a scale function whose base and ratio change with the width. The returned function takes a step and returns a `clamp()` string that changes from the value of the `min` scale to the value of the `max` scale.

```ts
const scale = createFluidScale({
  min: { base: 16, ratio: 1.2 },
  max: { base: 20, ratio: 1.25 },
});
scale(0); // 'clamp(1rem, 0.896rem + 0.442vw, 1.25rem)'
```

| Option | Type                                    | Description                    |
| ------ | --------------------------------------- | ------------------------------ |
| `min`  | `Omit<ModularScaleOptions, 'decimals'>` | The scale at `minViewport`     |
| `max`  | `Omit<ModularScaleOptions, 'decimals'>` | The scale at `maxViewport`     |
| Others |                                         | Options for `createFluidValue` |

#### Types

| Type                  | Description                      |
| --------------------- | -------------------------------- |
| `ModularScaleOptions` | Options for `createModularScale` |
| `FluidValueOptions`   | Options for `createFluidValue`   |
| `FluidScaleOptions`   | Options for `createFluidScale`   |

### Sizes and layout

| Function                                  | Description                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| `calculateObjectFit(size, box, options?)` | Returns the position and size fitted to a box, calculated like `object-fit` |
| `calculateColumnWidth(span, options)`     | Returns the width of a number of columns in a column grid                   |
| `getPaperSize(name, options?)`            | Returns a paper size (distinguishes JIS and ISO B series)                   |

#### `calculateObjectFit`

```ts
calculateObjectFit(size: Size, box: Size, options?: CalculateObjectFitOptions): Rect
```

Returns the position and size of `size` fitted to `box`, calculated in the same way as CSS `object-fit` / `object-position`. The position is relative to the top left of `box`. Useful for drawing on a canvas and for generating thumbnails or OGP images.

```ts
calculateObjectFit({ width: 400, height: 200 }, { width: 300, height: 300 });
// { x: 0, y: 75, width: 300, height: 150 }
calculateObjectFit(
  { width: 400, height: 200 },
  { width: 300, height: 300 },
  { fit: 'cover', positionX: 0 },
);
// { x: 0, y: 0, width: 600, height: 300 }
```

| Option       | Type                                                       | Description                                                           |
| ------------ | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `fit?`       | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | How to fit. Same as CSS `object-fit`. Defaults to `'contain'`         |
| `positionX?` | `number`                                                   | Horizontal alignment (`0` for left, `1` for right). Defaults to `0.5` |
| `positionY?` | `number`                                                   | Vertical alignment (`0` for top, `1` for bottom). Defaults to `0.5`   |
| `decimals?`  | `number`                                                   | Number of decimal places. Defaults to `3`                             |

#### `calculateColumnWidth`

```ts
calculateColumnWidth(span: number, options: CalculateColumnWidthOptions): number
```

Returns the width of `span` columns in a column grid, including the gutters between them. Useful for checking the numbers in a design comp.

```ts
calculateColumnWidth(4, { columns: 12, gutter: 24, containerWidth: 1128 }); // 360
```

| Option           | Type     | Description                               |
| ---------------- | -------- | ----------------------------------------- |
| `columns`        | `number` | Number of columns                         |
| `gutter`         | `number` | Gap between columns                       |
| `containerWidth` | `number` | Width of the whole grid                   |
| `decimals?`      | `number` | Number of decimal places. Defaults to `3` |

#### `getPaperSize`

```ts
getPaperSize(name: PaperSizeName, options?: GetPaperSizeOptions): Size
```

Returns a paper size. The names follow the keywords for `size` in CSS `@page`.

Specify Japanese B sizes (JIS B series) like `JIS-B5`. `B5` in CSS is ISO B5 (176 × 250mm), which differs from Japanese B5 (182 × 257mm).

```ts
getPaperSize('A4'); // { width: 210, height: 297 }
getPaperSize('JIS-B5', { orientation: 'landscape' }); // { width: 257, height: 182 }
getPaperSize('A4', { unit: 'px' }); // { width: 793.701, height: 1122.52 }
```

| Parameter | Type            | Description                                                                                               |
| --------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| `name`    | `PaperSizeName` | `'A0'`–`'A10'`, `'B0'`–`'B10'`, `'C0'`–`'C10'`, `'JIS-B0'`–`'JIS-B10'`, `'letter'`, `'legal'`, `'ledger'` |

| Option         | Type                        | Description                                                                      |
| -------------- | --------------------------- | -------------------------------------------------------------------------------- |
| `orientation?` | `'portrait' \| 'landscape'` | Orientation. Defaults to `'portrait'`                                            |
| `unit?`        | `CssUnit`                   | Unit. Conversion to `px` and others follows CSS (1in = 96px). Defaults to `'mm'` |
| `decimals?`    | `number`                    | Number of decimal places. Defaults to `3`                                        |

#### Constants

| Constant      | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `PAPER_SIZES` | An object of portrait sizes (mm), keyed by paper size name |

#### Types

| Type                          | Description                         |
| ----------------------------- | ----------------------------------- |
| `Size`                        | `{ width: number; height: number }` |
| `Rect`                        | `Size` with `x` and `y`             |
| `CalculateObjectFitOptions`   | Options for `calculateObjectFit`    |
| `CalculateColumnWidthOptions` | Options for `calculateColumnWidth`  |
| `PaperSizeName`               | Paper size names                    |
| `GetPaperSizeOptions`         | Options for `getPaperSize`          |

### CSS values

| Function                                     | Description                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------- |
| `appendUnit(value, unit?)`                   | Appends a unit to a number and returns a string                        |
| `createCssVariables(tokens, options?)`       | Creates an object of CSS variables from design tokens                  |
| `createCssVariableReference(path, options?)` | Creates a `var()` with the same rules as `createCssVariables`          |
| `createMediaQuery(breakpoints, options?)`    | Returns functions that create `@media` / `@container` from breakpoints |

#### `appendUnit`

```ts
appendUnit(value: string | number | null | undefined, unit?: string): string | null | undefined
```

If `value` is a number, returns it as a string with `unit` appended. Otherwise, returns `value` as is.

```ts
appendUnit(10); // '10px'
appendUnit(1.5, 'rem'); // '1.5rem'
appendUnit('50%'); // '50%'
```

| Parameter | Type     | Description              |
| --------- | -------- | ------------------------ |
| `unit?`   | `string` | Unit. Defaults to `'px'` |

#### `createCssVariables`

```ts
createCssVariables(tokens: DesignTokens, options?: CreateCssVariablesOptions): Record<`--${string}`, string>
```

Creates an object of CSS variables from an object of design tokens. Each variable name is the keys of its path joined with `separator`. You can pass the result directly to a React `style`, or turn it into a string for the body of `:root { … }`.

```ts
createCssVariables(
  { color: { primary: '#06c' }, space: { s: 8 } },
  { prefix: 'frg', unit: 'px' },
);
// { '--frg-color-primary': '#06c', '--frg-space-s': '8px' }
```

| Option       | Type     | Description                                              |
| ------------ | -------- | -------------------------------------------------------- |
| `prefix?`    | `string` | Prefix of the variable names                             |
| `separator?` | `string` | Separator between levels. Defaults to `'-'`              |
| `unit?`      | `string` | Unit appended to numbers. No unit is appended if omitted |

#### `createCssVariableReference`

```ts
createCssVariableReference(path: string, options?: CreateCssVariableReferenceOptions): string
```

Creates a `var()` that refers to a CSS variable, with the same rules as `createCssVariables`. Specify `path` as the token keys joined with `.`.

```ts
createCssVariableReference('color.primary', { prefix: 'frg' }); // 'var(--frg-color-primary)'
createCssVariableReference('color.primary', { fallback: '#06c' }); // 'var(--color-primary, #06c)'
```

| Option       | Type     | Description                                 |
| ------------ | -------- | ------------------------------------------- |
| `prefix?`    | `string` | Prefix of the variable name                 |
| `separator?` | `string` | Separator between levels. Defaults to `'-'` |
| `fallback?`  | `string` | Value used when the variable is not defined |

#### `createMediaQuery`

```ts
createMediaQuery<K extends string>(breakpoints: Readonly<Record<K, number>>, options?: MediaQueryOptions): MediaQuery<K>
```

Returns functions that create `@media` / `@container` queries from breakpoint names and widths (px). Useful as keys in CSS-in-JS.

```ts
const mq = createMediaQuery({ sm: 640, md: 768, lg: 1024 });
mq.up('md'); // '@media (width >= 768px)'
mq.down('md'); // '@media (width < 768px)'
mq.between('sm', 'lg'); // '@media (640px <= width < 1024px)'
mq.only('md'); // '@media (768px <= width < 1024px)'
```

| Method              | Description                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `up(name)`          | At least the width of `name`                                                                                   |
| `down(name)`        | Less than the width of `name`                                                                                  |
| `between(min, max)` | At least the width of `min` and less than the width of `max`                                                   |
| `only(name)`        | At least the width of `name` and less than the next larger breakpoint. Same as `up` for the largest breakpoint |

| Option    | Type                     | Description                                                                                                                                                   |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type?`   | `'media' \| 'container'` | Kind of query. Defaults to `'media'`                                                                                                                          |
| `unit?`   | `'px' \| 'em'`           | Output unit. `em` is converted with 16px as 1em. Defaults to `'px'`                                                                                           |
| `syntax?` | `'range' \| 'min-max'`   | `'range'`: range syntax, `'min-max'`: `min-width` / `max-width` (for browsers without range syntax; the upper bound is 0.02px smaller). Defaults to `'range'` |

#### Types

| Type                                | Description                              |
| ----------------------------------- | ---------------------------------------- |
| `DesignTokens`                      | Tokens passed to `createCssVariables`    |
| `CreateCssVariablesOptions`         | Options for `createCssVariables`         |
| `CreateCssVariableReferenceOptions` | Options for `createCssVariableReference` |
| `MediaQueryOptions`                 | Options for `createMediaQuery`           |
| `MediaQuery<K>`                     | Functions returned by `createMediaQuery` |

### Colors

| Function                            | Description                                                 |
| ----------------------------------- | ----------------------------------------------------------- |
| `createColorScale(color, options?)` | Creates color steps from one color as `color-mix()` strings |

For color space conversion, contrast ratios, and similar calculations, use a library such as [culori](https://culorijs.org/). This package focuses on creating strings for CSS color functions.

#### `createColorScale`

```ts
createColorScale(color: string, options?: ColorScaleOptions): Record<number, string>
```

Creates color steps from one color as CSS `color-mix()` strings. Since the browser calculates the colors, you can use a CSS variable such as `var(--brand)` as the source color. This lets you build a palette in which a theme switch replaces only the source color.

Step `0` is `light`, `baseStep` is the source color, and `1000` is `dark`. Steps in between mix the colors in proportion to the step.

```ts
createColorScale('var(--brand)');
// {
//   50: 'color-mix(in oklch, var(--brand) 10%, white)',
//   …
//   500: 'var(--brand)',
//   …
//   950: 'color-mix(in oklch, var(--brand) 10%, black)',
// }
```

| Option      | Type                | Description                                                    |
| ----------- | ------------------- | -------------------------------------------------------------- |
| `steps?`    | `readonly number[]` | Steps to create. Defaults to `[50, 100, 200, …, 900, 950]`     |
| `baseStep?` | `number`            | Step that uses the source color as is. Defaults to `500`       |
| `space?`    | `string`            | Color space for mixing in `color-mix()`. Defaults to `'oklch'` |
| `light?`    | `string`            | Color mixed into steps below `baseStep`. Defaults to `'white'` |
| `dark?`     | `string`            | Color mixed into steps above `baseStep`. Defaults to `'black'` |
| `decimals?` | `number`            | Number of decimal places of the percentages. Defaults to `3`   |

#### Types

| Type                | Description                    |
| ------------------- | ------------------------------ |
| `ColorScaleOptions` | Options for `createColorScale` |

### Easing

| Function                               | Description                                                       |
| -------------------------------------- | ----------------------------------------------------------------- |
| `createLinearEasing(easing, options?)` | Converts a JavaScript easing function to CSS `linear()`           |
| `createSpringEasing(options?)`         | Creates the easing function, duration, and `linear()` of a spring |

#### `createLinearEasing`

```ts
createLinearEasing(easing: EasingFunction, options?: LinearEasingOptions): string
```

Converts a JavaScript easing function (such as those from d3-ease) to a CSS `linear()` string. The function is evaluated over `samples` intervals, and points are dropped where connecting their neighbors with a straight line stays within `tolerance`.

```ts
createLinearEasing((t) => t * t, { samples: 4, tolerance: 0.1 }); // 'linear(0, 0.25 50%, 1)'
```

| Option       | Type     | Description                                                                   |
| ------------ | -------- | ----------------------------------------------------------------------------- |
| `samples?`   | `number` | Number of intervals to evaluate the easing function over. Defaults to `100`   |
| `tolerance?` | `number` | Allowed error when dropping points. `0` keeps all points. Defaults to `0.002` |
| `decimals?`  | `number` | Number of decimal places. Defaults to `3`                                     |

#### `createSpringEasing`

```ts
createSpringEasing(options?: SpringEasingOptions): SpringEasing
```

Creates an easing function (`easing`), the time until the spring comes to rest (`duration`, in ms), and a CSS `linear()` string (`css`) from a physical spring model. Setting `duration` as `transition-duration` or similar makes the motion match the speed of the spring.

```ts
const { css, duration } = createSpringEasing({ stiffness: 200, damping: 15 });
element.style.transition = `transform ${duration}ms ${css}`;
```

| Option       | Type     | Description                                                                           |
| ------------ | -------- | ------------------------------------------------------------------------------------- |
| `stiffness?` | `number` | Stiffness of the spring. Higher values move faster. Defaults to `100`                 |
| `damping?`   | `number` | Strength of damping. Lower values bounce more. Defaults to `10`                       |
| `mass?`      | `number` | Mass. Higher values move more slowly. Defaults to `1`                                 |
| `velocity?`  | `number` | Initial velocity (distance per second, with the whole distance as 1). Defaults to `0` |
| Others       |          | Options for `createLinearEasing`                                                      |

#### Types

| Type                  | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `EasingFunction`      | `(t: number) => number`                                            |
| `LinearEasingOptions` | Options for `createLinearEasing`                                   |
| `SpringEasingOptions` | Options for `createSpringEasing`                                   |
| `SpringEasing`        | Return value of `createSpringEasing` (`easing`, `duration`, `css`) |

## License

MIT
