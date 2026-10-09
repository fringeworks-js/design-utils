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
import { fitToGolden } from '@fringeworks/design-utils';
import fitToGolden from '@fringeworks/design-utils/fitToGolden';
```

### Data Last

Functions with `dataLast` take every argument except the data first and return a function that receives the data. This is useful in pipelines and as a callback for methods such as `Array.prototype.map`. Functions that have `dataLast` show it alongside their signatures.

```ts
const fn = fitToRatio.dataLast(16 / 9, { mode: 'shrink' });
```

---

## API

| Function                             | Description                                                  |
| ------------------------------------ | ------------------------------------------------------------ |
| `appendUnit(value, unit?)`           | Appends a unit to a number and returns a string              |
| `fitToRatio(value, ratio, options?)` | Returns a value multiplied (or divided) by a ratio           |
| `fitToBronze(value, options?)`       | Returns the value at the bronze ratio (≈ 3.303)              |
| `fitToDouble(value, options?)`       | Returns the value at 1:2                                     |
| `fitToGolden(value, options?)`       | Returns the value at the golden ratio (≈ 1.618)              |
| `fitToHarmonic(value, options?)`     | Returns the value at the harmonic ratio (4:3 ≈ 1.333)        |
| `fitToPlatinum(value, options?)`     | Returns the value at the platinum ratio (≈ 1.325)            |
| `fitToSilver(value, options?)`       | Returns the value at the silver ratio (1 + √2 ≈ 2.414)       |
| `fitToSqrt2(value, options?)`        | Returns the value at the √2 ratio (≈ 1.414)                  |
| `fitToSqrt3(value, options?)`        | Returns the value at the √3 ratio (≈ 1.732)                  |
| `fitToSqrt5(value, options?)`        | Returns the value at the √5 ratio (≈ 2.236)                  |
| `fitToYamato(value, options?)`       | Returns the value at the Yamato ratio (same as the √2 ratio) |

### `appendUnit`

```ts
appendUnit(value: string | number | null | undefined, unit?: string): string | null | undefined
```

Returns a string with `unit` appended when `value` is a number, and `value` as is otherwise. Useful for building CSS values.

```ts
appendUnit(10); // '10px'
appendUnit(1.5, 'rem'); // '1.5rem'
appendUnit('50%'); // '50%'
```

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `unit?`   | `string` | The unit. Defaults to `'px'` |

### `fitToRatio`

```ts
fitToRatio(value: number, ratio: number, options?: FitToRatioOptions): number
fitToRatio.dataLast(ratio: number, options?: FitToRatioOptions): (value: number) => number
```

Returns the value that is at `ratio` to `value`. By default the result is `value × ratio`, rounded to 3 decimal places.

```ts
fitToRatio(100, 16 / 9); // 177.778
fitToRatio(100, 16 / 9, { mode: 'shrink' }); // 56.25
```

| Option      | Type                   | Description                                                                      |
| ----------- | ---------------------- | -------------------------------------------------------------------------------- |
| `mode?`     | `'expand' \| 'shrink'` | `'expand'`: `value × ratio`; `'shrink'`: `value ÷ ratio`. Defaults to `'expand'` |
| `decimals?` | `number`               | The number of decimal places in the result. Defaults to `3`                      |

### Ratio functions

```ts
fitToBronze(value: number, options?: FitToRatioOptions): number
fitToDouble(value: number, options?: FitToRatioOptions): number
fitToGolden(value: number, options?: FitToRatioOptions): number
fitToGolden.dataLast(options?: FitToRatioOptions): (value: number) => number
fitToHarmonic(value: number, options?: FitToRatioOptions): number
fitToPlatinum(value: number, options?: FitToRatioOptions): number
fitToSilver(value: number, options?: FitToRatioOptions): number
fitToSqrt2(value: number, options?: FitToRatioOptions): number
fitToSqrt3(value: number, options?: FitToRatioOptions): number
fitToSqrt5(value: number, options?: FitToRatioOptions): number
fitToYamato(value: number, options?: FitToRatioOptions): number
```

Call `fitToRatio` with ratios often used in design and architecture. The options are the same as `fitToRatio`.

```ts
fitToGolden(100); // 161.803
fitToGolden(100, { mode: 'shrink' }); // 61.803
```

### Types

| Type                                                                                                                                                                                                                        | Description                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `FitToRatioOptions`                                                                                                                                                                                                         | Options for `fitToRatio`    |
| `FitToBronzeOptions`, `FitToDoubleOptions`, `FitToGoldenOptions`, `FitToHarmonicOptions`, `FitToPlatinumOptions`, `FitToSilverOptions`, `FitToSqrt2Options`, `FitToSqrt3Options`, `FitToSqrt5Options`, `FitToYamatoOptions` | Same as `FitToRatioOptions` |

## License

MIT
