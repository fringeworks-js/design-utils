# @fringeworks/design-utils

`@fringeworks/design-utils` は、デザインの比率に基づくサイズの計算や CSS の値の作成など、Node.js でも使えるデザインのための、誰かにとっては便利なライブラリです。

**[English README is available here](./README.md)**

## インストール

```bash
npm install @fringeworks/design-utils
# または
pnpm add @fringeworks/design-utils
```

## 使い方

関数・型・定数は、ルートと関数単位のパスのどちらからでも同じ名前で import できます。関数単位のパスでは、その関数を default import することもできます。

```ts
import { fitToGolden } from '@fringeworks/design-utils';
import fitToGolden from '@fringeworks/design-utils/fitToGolden';
```

### Data Last

`dataLast` を持つ関数は、データ以外の引数を先に受け取り、データを受け取る関数を返します。パイプライン処理や、`Array.prototype.map` などのコールバックに渡す場合に使えます。`dataLast` を持つ関数は、シグネチャに `dataLast` を併記しています。

```ts
const fn = fitToRatio.dataLast(16 / 9, { mode: 'shrink' });
```

---

## API

| 関数                                 | 説明                                       |
| ------------------------------------ | ------------------------------------------ |
| `appendUnit(value, unit?)`           | 数値に単位を付けて文字列にする             |
| `fitToRatio(value, ratio, options?)` | 値に比率を掛けた値（または割った値）を返す |
| `fitToBronze(value, options?)`       | 青銅比（≈ 3.303）の値を返す                |
| `fitToDouble(value, options?)`       | 1:2 の値を返す                             |
| `fitToGolden(value, options?)`       | 黄金比（≈ 1.618）の値を返す                |
| `fitToHarmonic(value, options?)`     | 調和比（4:3 ≈ 1.333）の値を返す            |
| `fitToPlatinum(value, options?)`     | 白金比（≈ 1.325）の値を返す                |
| `fitToSilver(value, options?)`       | 白銀比（1 + √2 ≈ 2.414）の値を返す         |
| `fitToSqrt2(value, options?)`        | √2 比（≈ 1.414）の値を返す                 |
| `fitToSqrt3(value, options?)`        | √3 比（≈ 1.732）の値を返す                 |
| `fitToSqrt5(value, options?)`        | √5 比（≈ 2.236）の値を返す                 |
| `fitToYamato(value, options?)`       | 大和比（√2 比と同じ）の値を返す            |

### `appendUnit`

```ts
appendUnit(value: string | number | null | undefined, unit?: string): string | null | undefined
```

`value` が数値の場合は `unit` を付けた文字列を返し、それ以外の場合は `value` をそのまま返します。CSS の値を作る場合などに使います。

```ts
appendUnit(10); // '10px'
appendUnit(1.5, 'rem'); // '1.5rem'
appendUnit('50%'); // '50%'
```

| 引数    | 型       | 説明                      |
| ------- | -------- | ------------------------- |
| `unit?` | `string` | 単位。デフォルトは `'px'` |

### `fitToRatio`

```ts
fitToRatio(value: number, ratio: number, options?: FitToRatioOptions): number
fitToRatio.dataLast(ratio: number, options?: FitToRatioOptions): (value: number) => number
```

`value` に対して `ratio` の比率になる値を返します。デフォルトでは `value × ratio` で、結果は小数点以下 3 桁に丸めます。

```ts
fitToRatio(100, 16 / 9); // 177.778
fitToRatio(100, 16 / 9, { mode: 'shrink' }); // 56.25
```

| オプション  | 型                     | 説明                                                                              |
| ----------- | ---------------------- | --------------------------------------------------------------------------------- |
| `mode?`     | `'expand' \| 'shrink'` | `'expand'`: `value × ratio`、`'shrink'`: `value ÷ ratio`。デフォルトは `'expand'` |
| `decimals?` | `number`               | 結果の小数点以下の桁数。デフォルトは `3`                                          |

### 比率ごとの関数

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

デザインや建築でよく使われる比率で `fitToRatio` を呼び出します。オプションは `fitToRatio` と同じです。

```ts
fitToGolden(100); // 161.803
fitToGolden(100, { mode: 'shrink' }); // 61.803
```

### 型

| 型                                                                                                                                                                                                                          | 説明                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `FitToRatioOptions`                                                                                                                                                                                                         | `fitToRatio` のオプション  |
| `FitToBronzeOptions`、`FitToDoubleOptions`、`FitToGoldenOptions`、`FitToHarmonicOptions`、`FitToPlatinumOptions`、`FitToSilverOptions`、`FitToSqrt2Options`、`FitToSqrt3Options`、`FitToSqrt5Options`、`FitToYamatoOptions` | `FitToRatioOptions` と同じ |

## ライセンス

MIT
