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
import { scaleByGolden } from '@fringeworks/design-utils';
import scaleByGolden from '@fringeworks/design-utils/scaleByGolden';
```

DOM には依存しないため、ビルド時のデザイントークンの生成やサーバーサイドでも使えます。

### Data Last

`dataLast` を持つ関数は、データ以外の引数を先に受け取り、データを受け取る関数を返します。パイプライン処理や、`Array.prototype.map` などのコールバックに渡す場合に使えます。`dataLast` を持つ関数は、シグネチャに `dataLast` を併記しています。

```ts
const fn = scaleByRatio.dataLast(16 / 9, { mode: 'shrink' });
```

### 小数点以下の桁数

数値を返す関数と、数値を含む文字列を返す関数は、`decimals` オプションで結果を丸めます。デフォルトはどの関数も小数点以下 3 桁です。

### 作成する CSS の対応ブラウザー

`createFluidValue` の `cqi`、`createMediaQuery` の範囲の構文、`createColorScale` の `color-mix()`、`createLinearEasing` の `linear()` などは、比較的新しいブラウザーでのみ動作します。作成した値が使えるかどうかは、利用する側の対象ブラウザーに合わせて確認してください。古いブラウザー向けの書き方を選べるオプションがある場合は、各関数の説明に記載しています。

---

## API

### 比率

| 関数                                   | 説明                                       |
| -------------------------------------- | ------------------------------------------ |
| `scaleByRatio(value, ratio, options?)` | 値に比率を掛けた値（または割った値）を返す |
| `scaleByBronze(value, options?)`       | 青銅比（≈ 3.303）の値を返す                |
| `scaleByDouble(value, options?)`       | 1:2 の値を返す                             |
| `scaleByGolden(value, options?)`       | 黄金比（≈ 1.618）の値を返す                |
| `scaleByHarmonic(value, options?)`     | 調和比（4:3 ≈ 1.333）の値を返す            |
| `scaleByPlatinum(value, options?)`     | 白金比（≈ 1.325）の値を返す                |
| `scaleBySilver(value, options?)`       | 白銀比（1 + √2 ≈ 2.414）の値を返す         |
| `scaleBySqrt2(value, options?)`        | √2 比（≈ 1.414）の値を返す                 |
| `scaleBySqrt3(value, options?)`        | √3 比（≈ 1.732）の値を返す                 |
| `scaleBySqrt5(value, options?)`        | √5 比（≈ 2.236）の値を返す                 |
| `scaleByYamato(value, options?)`       | 大和比（√2 比と同じ）の値を返す            |

#### `scaleByRatio`

```ts
scaleByRatio(value: number, ratio: number, options?: ScaleByRatioOptions): number
scaleByRatio.dataLast(ratio: number, options?: ScaleByRatioOptions): (value: number) => number
```

`value` に対して `ratio` の比率になる値を返します。デフォルトでは `value × ratio` です。

```ts
scaleByRatio(100, 16 / 9); // 177.778
scaleByRatio(100, 16 / 9, { mode: 'shrink' }); // 56.25
```

| オプション  | 型                     | 説明                                                                              |
| ----------- | ---------------------- | --------------------------------------------------------------------------------- |
| `mode?`     | `'expand' \| 'shrink'` | `'expand'`: `value × ratio`、`'shrink'`: `value ÷ ratio`。デフォルトは `'expand'` |
| `decimals?` | `number`               | 小数点以下の桁数。デフォルトは `3`                                                |

#### 比率ごとの関数

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

デザインや建築でよく使われる比率で `scaleByRatio` を呼び出します。オプションは `scaleByRatio` と同じです。

```ts
scaleByGolden(100); // 161.803
scaleByGolden(100, { mode: 'shrink' }); // 61.803
```

#### 定数

| 定数             | 説明                           |
| ---------------- | ------------------------------ |
| `GOLDEN_RATIO`   | 黄金比（≈ 1.618）              |
| `SILVER_RATIO`   | 白銀比（1 + √2 ≈ 2.414）       |
| `BRONZE_RATIO`   | 青銅比（≈ 3.303）              |
| `PLATINUM_RATIO` | 白金比（≈ 1.325）              |
| `SQRT2_RATIO`    | √2 比（≈ 1.414）               |
| `SQRT3_RATIO`    | √3 比（≈ 1.732）               |
| `SQRT5_RATIO`    | √5 比（≈ 2.236）               |
| `YAMATO_RATIO`   | 大和比（`SQRT2_RATIO` と同じ） |
| `HARMONIC_RATIO` | 調和比（4:3 ≈ 1.333）          |
| `DOUBLE_RATIO`   | 1:2                            |

#### 型

| 型                                                                                                                                                                                                                                              | 説明                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `ScaleByRatioOptions`                                                                                                                                                                                                                           | `scaleByRatio` のオプション  |
| `ScaleByBronzeOptions`、`ScaleByDoubleOptions`、`ScaleByGoldenOptions`、`ScaleByHarmonicOptions`、`ScaleByPlatinumOptions`、`ScaleBySilverOptions`、`ScaleBySqrt2Options`、`ScaleBySqrt3Options`、`ScaleBySqrt5Options`、`ScaleByYamatoOptions` | `ScaleByRatioOptions` と同じ |

### 単位

| 関数                                                      | 説明                                                       |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| `convertUnit(value, from, to, options?)`                  | CSS の長さの単位を変換する（`Q` に対応）                   |
| `convertTrackingToEm(tracking, options?)`                 | トラッキング（1/1000em）を `letter-spacing` の `em` にする |
| `convertLeadingToLineHeight(leading, fontSize, options?)` | 行送りを単位なしの `line-height` にする                    |

#### `convertUnit`

```ts
convertUnit(value: number, from: CssUnit, to: CssUnit, options?: ConvertUnitOptions): number
convertUnit.dataLast(from: CssUnit, to: CssUnit, options?: ConvertUnitOptions): (value: number) => number
```

CSS の長さの単位を変換します。絶対単位は CSS の定義（1in = 96px = 72pt）に従います。`Q` は 1/4mm で、写植・DTP の級数や歯送りの値を CSS の値に変換できます。

```ts
convertUnit(24, 'px', 'rem'); // 1.5
convertUnit(13, 'Q', 'pt'); // 9.213
[12, 24].map(convertUnit.dataLast('px', 'rem')); // [0.75, 1.5]
```

| オプション      | 型       | 説明                                                           |
| --------------- | -------- | -------------------------------------------------------------- |
| `rootFontSize?` | `number` | `rem` の基準になる文字サイズ（px）。デフォルトは `16`          |
| `fontSize?`     | `number` | `em` の基準になる文字サイズ（px）。デフォルトは `rootFontSize` |
| `decimals?`     | `number` | 小数点以下の桁数。デフォルトは `3`                             |

#### `convertTrackingToEm`

```ts
convertTrackingToEm(tracking: number, options?: ConvertTrackingToEmOptions): number
```

Illustrator や InDesign などのトラッキング（1/1000em）を、CSS の `letter-spacing` に使う `em` の値に変換します。

```ts
convertTrackingToEm(100); // 0.1
```

| オプション  | 型       | 説明                               |
| ----------- | -------- | ---------------------------------- |
| `decimals?` | `number` | 小数点以下の桁数。デフォルトは `3` |

#### `convertLeadingToLineHeight`

```ts
convertLeadingToLineHeight(leading: number, fontSize: number, options?: ConvertLeadingToLineHeightOptions): number
```

行送り（文字サイズを含む行の間隔）を、単位なしの `line-height` に変換します。`leading` と `fontSize` は同じ単位で指定します。単位が異なる場合は `convertUnit` で揃えます。

```ts
convertLeadingToLineHeight(24, 16); // 1.5
```

| オプション  | 型       | 説明                               |
| ----------- | -------- | ---------------------------------- |
| `decimals?` | `number` | 小数点以下の桁数。デフォルトは `3` |

#### 型

| 型                                  | 説明                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------- |
| `CssUnit`                           | `'px' \| 'rem' \| 'em' \| 'pt' \| 'pc' \| 'in' \| 'cm' \| 'mm' \| 'Q'` |
| `ConvertUnitOptions`                | `convertUnit` のオプション                                             |
| `ConvertTrackingToEmOptions`        | `convertTrackingToEm` のオプション                                     |
| `ConvertLeadingToLineHeightOptions` | `convertLeadingToLineHeight` のオプション                              |

### スケール

| 関数                                   | 説明                                               |
| -------------------------------------- | -------------------------------------------------- |
| `createModularScale(options?)`         | モジュラースケールの関数を作る                     |
| `createFluidValue(min, max, options?)` | 幅に応じて変化する値を `clamp()` の文字列で作る    |
| `createFluidScale(options)`            | 幅に応じて基準値と比率が変わるスケールの関数を作る |

#### `createModularScale`

```ts
createModularScale(options?: ModularScaleOptions): (step: number) => number
```

モジュラースケールの関数を作ります。返す関数は段階（`step`）を受け取り、`base × ratio ^ step` を返します。

`base` に配列を指定すると、複数の基準値を組み合わせたスケール（double stranded）になります。各基準値から作ったスケールを1つに合わせ、`base` の最初の値を段階 `0` として、小さい順に段階を振ります。

```ts
const scale = createModularScale({ ratio: HARMONIC_RATIO });
scale(0); // 16
scale(2); // 28.444
scale(-1); // 12

const double = createModularScale({ base: [16, 24], ratio: 2 });
[0, 1, 2, 3].map(double); // [16, 24, 32, 48]
```

| オプション  | 型                            | 説明                                                                          |
| ----------- | ----------------------------- | ----------------------------------------------------------------------------- |
| `base?`     | `number \| readonly number[]` | 基準値。配列の場合は複数の基準値を組み合わせる。デフォルトは `16`             |
| `ratio?`    | `number`                      | 比率。`base` が配列の場合は 1 より大きい値にする。デフォルトは `GOLDEN_RATIO` |
| `decimals?` | `number`                      | 小数点以下の桁数。デフォルトは `3`                                            |

#### `createFluidValue`

```ts
createFluidValue(min: number, max: number, options?: FluidValueOptions): string
```

画面（またはコンテナー）の幅に応じて `min` から `max` まで変化する値を、CSS の `clamp()` の文字列で返します。`min` と `max` はデザインカンプの値をそのまま使えるように px で指定します。`min` が `max` より大きい場合は、幅が広がるほど小さくなる値になります。

出力の単位を `rem` にすると、ブラウザーの文字サイズの設定が反映されます。

```ts
createFluidValue(16, 24); // 'clamp(1rem, 0.793rem + 0.884vw, 1.5rem)'
createFluidValue(16, 32, { unit: 'px', minViewport: 400, maxViewport: 1200 });
// 'clamp(16px, 8px + 2vw, 32px)'
```

| オプション      | 型                          | 説明                                                                                                      |
| --------------- | --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `minViewport?`  | `number`                    | `min` になる幅（px）。デフォルトは `375`                                                                  |
| `maxViewport?`  | `number`                    | `max` になる幅（px）。デフォルトは `1280`                                                                 |
| `unit?`         | `'px' \| 'rem'`             | 出力の単位。デフォルトは `'rem'`                                                                          |
| `rootFontSize?` | `number`                    | `rem` の基準になる文字サイズ（px）。デフォルトは `16`                                                     |
| `relativeTo?`   | `'viewport' \| 'container'` | `'viewport'`: ビューポートの幅（`vw`）、`'container'`: コンテナーの幅（`cqi`）。デフォルトは `'viewport'` |
| `decimals?`     | `number`                    | 小数点以下の桁数。デフォルトは `3`                                                                        |

#### `createFluidScale`

```ts
createFluidScale(options: FluidScaleOptions): (step: number) => string
```

`createModularScale` と `createFluidValue` を組み合わせ、幅に応じて基準値と比率が変わるスケールの関数を作ります。返す関数は段階（`step`）を受け取り、`min` のスケールの値から `max` のスケールの値まで変化する `clamp()` の文字列を返します。

```ts
const scale = createFluidScale({
  min: { base: 16, ratio: 1.2 },
  max: { base: 20, ratio: 1.25 },
});
scale(0); // 'clamp(1rem, 0.896rem + 0.442vw, 1.25rem)'
```

| オプション | 型                                      | 説明                            |
| ---------- | --------------------------------------- | ------------------------------- |
| `min`      | `Omit<ModularScaleOptions, 'decimals'>` | `minViewport` でのスケール      |
| `max`      | `Omit<ModularScaleOptions, 'decimals'>` | `maxViewport` でのスケール      |
| その他     |                                         | `createFluidValue` のオプション |

#### 型

| 型                    | 説明                              |
| --------------------- | --------------------------------- |
| `ModularScaleOptions` | `createModularScale` のオプション |
| `FluidValueOptions`   | `createFluidValue` のオプション   |
| `FluidScaleOptions`   | `createFluidScale` のオプション   |

### サイズ・レイアウト

| 関数                                      | 説明                                                      |
| ----------------------------------------- | --------------------------------------------------------- |
| `calculateObjectFit(size, box, options?)` | `object-fit` と同じ計算で、箱に合わせた位置と大きさを返す |
| `calculateColumnWidth(span, options)`     | カラムグリッドで指定の列数分の幅を返す                    |
| `getPaperSize(name, options?)`            | 紙のサイズを返す（JIS と ISO の B 列を区別）              |

#### `calculateObjectFit`

```ts
calculateObjectFit(size: Size, box: Size, options?: CalculateObjectFitOptions): Rect
```

`size` を `box` に合わせたときの位置と大きさを、CSS の `object-fit` / `object-position` と同じ計算で返します。位置は `box` の左上を原点とします。canvas への描画や、サムネイル・OGP 画像の生成などに使えます。

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

| オプション   | 型                                                         | 説明                                                           |
| ------------ | ---------------------------------------------------------- | -------------------------------------------------------------- |
| `fit?`       | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | 合わせ方。CSS の `object-fit` と同じ。デフォルトは `'contain'` |
| `positionX?` | `number`                                                   | 横方向の配置（`0` で左端、`1` で右端）。デフォルトは `0.5`     |
| `positionY?` | `number`                                                   | 縦方向の配置（`0` で上端、`1` で下端）。デフォルトは `0.5`     |
| `decimals?`  | `number`                                                   | 小数点以下の桁数。デフォルトは `3`                             |

#### `calculateColumnWidth`

```ts
calculateColumnWidth(span: number, options: CalculateColumnWidthOptions): number
```

カラムグリッドで `span` 列分の幅（間の列の間隔を含む）を返します。デザインカンプの数値の確認などに使えます。

```ts
calculateColumnWidth(4, { columns: 12, gutter: 24, containerWidth: 1128 }); // 360
```

| オプション       | 型       | 説明                               |
| ---------------- | -------- | ---------------------------------- |
| `columns`        | `number` | 列の数                             |
| `gutter`         | `number` | 列の間隔                           |
| `containerWidth` | `number` | グリッド全体の幅                   |
| `decimals?`      | `number` | 小数点以下の桁数。デフォルトは `3` |

#### `getPaperSize`

```ts
getPaperSize(name: PaperSizeName, options?: GetPaperSizeOptions): Size
```

紙のサイズを返します。名前は CSS の `@page` の `size` のキーワードに合わせています。

日本の B 判（JIS B 列）は `JIS-B5` のように指定します。CSS の `B5` は ISO の B5（176 × 250mm）で、日本の B5（182 × 257mm）とは大きさが違います。

```ts
getPaperSize('A4'); // { width: 210, height: 297 }
getPaperSize('JIS-B5', { orientation: 'landscape' }); // { width: 257, height: 182 }
getPaperSize('A4', { unit: 'px' }); // { width: 793.701, height: 1122.52 }
```

| 引数   | 型              | 説明                                                                                                          |
| ------ | --------------- | ------------------------------------------------------------------------------------------------------------- |
| `name` | `PaperSizeName` | `'A0'`〜`'A10'`、`'B0'`〜`'B10'`、`'C0'`〜`'C10'`、`'JIS-B0'`〜`'JIS-B10'`、`'letter'`、`'legal'`、`'ledger'` |

| オプション     | 型                          | 説明                                                                        |
| -------------- | --------------------------- | --------------------------------------------------------------------------- |
| `orientation?` | `'portrait' \| 'landscape'` | 向き。デフォルトは `'portrait'`                                             |
| `unit?`        | `CssUnit`                   | 単位。`px` などへは CSS の定義（1in = 96px）で換算する。デフォルトは `'mm'` |
| `decimals?`    | `number`                    | 小数点以下の桁数。デフォルトは `3`                                          |

#### 定数

| 定数          | 説明                                                             |
| ------------- | ---------------------------------------------------------------- |
| `PAPER_SIZES` | 紙のサイズの名前をキーにした、縦向きの大きさ（mm）のオブジェクト |

#### 型

| 型                            | 説明                                |
| ----------------------------- | ----------------------------------- |
| `Size`                        | `{ width: number; height: number }` |
| `Rect`                        | `Size` に `x`・`y` を加えたもの     |
| `CalculateObjectFitOptions`   | `calculateObjectFit` のオプション   |
| `CalculateColumnWidthOptions` | `calculateColumnWidth` のオプション |
| `PaperSizeName`               | 紙のサイズの名前                    |
| `GetPaperSizeOptions`         | `getPaperSize` のオプション         |

### CSS の値

| 関数                                         | 説明                                                          |
| -------------------------------------------- | ------------------------------------------------------------- |
| `appendUnit(value, unit?)`                   | 数値に単位を付けて文字列にする                                |
| `createCssVariables(tokens, options?)`       | デザイントークンから CSS 変数のオブジェクトを作る             |
| `createCssVariableReference(path, options?)` | `createCssVariables` と同じ規則で `var()` を作る              |
| `createMediaQuery(breakpoints, options?)`    | ブレークポイントから `@media` / `@container` を作る関数を返す |

#### `appendUnit`

```ts
appendUnit(value: string | number | null | undefined, unit?: string): string | null | undefined
```

`value` が数値の場合は `unit` を付けた文字列を返し、それ以外の場合は `value` をそのまま返します。

```ts
appendUnit(10); // '10px'
appendUnit(1.5, 'rem'); // '1.5rem'
appendUnit('50%'); // '50%'
```

| 引数    | 型       | 説明                      |
| ------- | -------- | ------------------------- |
| `unit?` | `string` | 単位。デフォルトは `'px'` |

#### `createCssVariables`

```ts
createCssVariables(tokens: DesignTokens, options?: CreateCssVariablesOptions): Record<`--${string}`, string>
```

デザイントークンのオブジェクトから CSS 変数のオブジェクトを作ります。階層のキーを `separator` でつないだものが変数名になります。戻り値は React の `style` にそのまま渡せるほか、文字列にして `:root { … }` の中身にも使えます。

```ts
createCssVariables(
  { color: { primary: '#06c' }, space: { s: 8 } },
  { prefix: 'frg', unit: 'px' },
);
// { '--frg-color-primary': '#06c', '--frg-space-s': '8px' }
```

| オプション   | 型       | 説明                                             |
| ------------ | -------- | ------------------------------------------------ |
| `prefix?`    | `string` | 変数名の接頭辞                                   |
| `separator?` | `string` | 階層の区切り。デフォルトは `'-'`                 |
| `unit?`      | `string` | 数値に付ける単位。指定しない場合は単位を付けない |

#### `createCssVariableReference`

```ts
createCssVariableReference(path: string, options?: CreateCssVariableReferenceOptions): string
```

`createCssVariables` と同じ規則で、CSS 変数を参照する `var()` を作ります。`path` はトークンのキーを `.` でつないで指定します。

```ts
createCssVariableReference('color.primary', { prefix: 'frg' }); // 'var(--frg-color-primary)'
createCssVariableReference('color.primary', { fallback: '#06c' }); // 'var(--color-primary, #06c)'
```

| オプション   | 型       | 説明                             |
| ------------ | -------- | -------------------------------- |
| `prefix?`    | `string` | 変数名の接頭辞                   |
| `separator?` | `string` | 階層の区切り。デフォルトは `'-'` |
| `fallback?`  | `string` | 変数が定義されていない場合の値   |

#### `createMediaQuery`

```ts
createMediaQuery<K extends string>(breakpoints: Readonly<Record<K, number>>, options?: MediaQueryOptions): MediaQuery<K>
```

ブレークポイントの名前と幅（px）から、`@media` / `@container` のクエリーを作る関数を返します。CSS-in-JS のキーなどに使えます。

```ts
const mq = createMediaQuery({ sm: 640, md: 768, lg: 1024 });
mq.up('md'); // '@media (width >= 768px)'
mq.down('md'); // '@media (width < 768px)'
mq.between('sm', 'lg'); // '@media (640px <= width < 1024px)'
mq.only('md'); // '@media (768px <= width < 1024px)'
```

| メソッド            | 説明                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `up(name)`          | `name` の幅以上                                                                                 |
| `down(name)`        | `name` の幅未満                                                                                 |
| `between(min, max)` | `min` の幅以上、`max` の幅未満                                                                  |
| `only(name)`        | `name` の幅以上、次に大きいブレークポイントの幅未満。一番大きいブレークポイントでは `up` と同じ |

| オプション | 型                       | 説明                                                                                                                                                            |
| ---------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type?`    | `'media' \| 'container'` | 作るクエリーの種類。デフォルトは `'media'`                                                                                                                      |
| `unit?`    | `'px' \| 'em'`           | 出力の単位。`em` は 16px を 1em として換算する。デフォルトは `'px'`                                                                                             |
| `syntax?`  | `'range' \| 'min-max'`   | `'range'`: 範囲の構文、`'min-max'`: `min-width` / `max-width`（範囲の構文に対応していないブラウザー向け。上限は 0.02px 小さい値にする）。デフォルトは `'range'` |

#### 型

| 型                                  | 説明                                      |
| ----------------------------------- | ----------------------------------------- |
| `DesignTokens`                      | `createCssVariables` に渡すトークン       |
| `CreateCssVariablesOptions`         | `createCssVariables` のオプション         |
| `CreateCssVariableReferenceOptions` | `createCssVariableReference` のオプション |
| `MediaQueryOptions`                 | `createMediaQuery` のオプション           |
| `MediaQuery<K>`                     | `createMediaQuery` が返す関数             |

### 色

| 関数                                | 説明                                                   |
| ----------------------------------- | ------------------------------------------------------ |
| `createColorScale(color, options?)` | 1つの色から段階ごとの色を `color-mix()` の文字列で作る |

色空間の変換やコントラスト比の計算などは、[culori](https://culorijs.org/) などのライブラリを使ってください。このパッケージでは、CSS の色の関数の文字列を作ることに絞っています。

#### `createColorScale`

```ts
createColorScale(color: string, options?: ColorScaleOptions): Record<number, string>
```

1つの色から、段階ごとの色を CSS の `color-mix()` の文字列で作ります。色の計算はブラウザーが行うため、`var(--brand)` のような CSS 変数を元の色に使えます。テーマの切り替えで元の色だけを差し替えるパレットを作れます。

段階 `0` を `light`、`baseStep` を元の色、`1000` を `dark` として、その間は段階に比例した割合で色を混ぜます。

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

| オプション  | 型                  | 説明                                                        |
| ----------- | ------------------- | ----------------------------------------------------------- |
| `steps?`    | `readonly number[]` | 作る段階。デフォルトは `[50, 100, 200, …, 900, 950]`        |
| `baseStep?` | `number`            | 元の色をそのまま使う段階。デフォルトは `500`                |
| `space?`    | `string`            | `color-mix()` で色を混ぜる色空間。デフォルトは `'oklch'`    |
| `light?`    | `string`            | `baseStep` より小さい段階で混ぜる色。デフォルトは `'white'` |
| `dark?`     | `string`            | `baseStep` より大きい段階で混ぜる色。デフォルトは `'black'` |
| `decimals?` | `number`            | 割合（%）の小数点以下の桁数。デフォルトは `3`               |

#### 型

| 型                  | 説明                            |
| ------------------- | ------------------------------- |
| `ColorScaleOptions` | `createColorScale` のオプション |

### イージング

| 関数                                   | 説明                                                       |
| -------------------------------------- | ---------------------------------------------------------- |
| `createLinearEasing(easing, options?)` | JavaScript のイージング関数を CSS の `linear()` に変換する |
| `createSpringEasing(options?)`         | ばねの動きのイージング関数・時間・`linear()` を作る        |

#### `createLinearEasing`

```ts
createLinearEasing(easing: EasingFunction, options?: LinearEasingOptions): string
```

JavaScript のイージング関数（d3-ease などのもの）を、CSS の `linear()` の文字列に変換します。`samples` 個の区間で計算した点のうち、前後の点を直線でつないでも誤差が `tolerance` 以下になる点を間引いて出力します。

```ts
createLinearEasing((t) => t * t, { samples: 4, tolerance: 0.1 }); // 'linear(0, 0.25 50%, 1)'
```

| オプション   | 型       | 説明                                                           |
| ------------ | -------- | -------------------------------------------------------------- |
| `samples?`   | `number` | イージング関数を計算する区間の数。デフォルトは `100`           |
| `tolerance?` | `number` | 間引きの許容誤差。`0` の場合は間引かない。デフォルトは `0.002` |
| `decimals?`  | `number` | 小数点以下の桁数。デフォルトは `3`                             |

#### `createSpringEasing`

```ts
createSpringEasing(options?: SpringEasingOptions): SpringEasing
```

ばねの物理モデルから、イージング関数（`easing`）・ばねが止まるまでの時間（`duration`、ms）・CSS の `linear()` の文字列（`css`）を作ります。`duration` を `transition-duration` などに指定すると、ばねと同じ速さで動きます。

```ts
const { css, duration } = createSpringEasing({ stiffness: 200, damping: 15 });
element.style.transition = `transform ${duration}ms ${css}`;
```

| オプション   | 型       | 説明                                                                    |
| ------------ | -------- | ----------------------------------------------------------------------- |
| `stiffness?` | `number` | ばねの硬さ。大きいほど速く動く。デフォルトは `100`                      |
| `damping?`   | `number` | 減衰の強さ。小さいほど大きく揺れる。デフォルトは `10`                   |
| `mass?`      | `number` | 質量。大きいほどゆっくり動く。デフォルトは `1`                          |
| `velocity?`  | `number` | 初速度（全体の移動量を 1 とした、1 秒あたりの移動量）。デフォルトは `0` |
| その他       |          | `createLinearEasing` のオプション                                       |

#### 型

| 型                    | 説明                                                         |
| --------------------- | ------------------------------------------------------------ |
| `EasingFunction`      | `(t: number) => number`                                      |
| `LinearEasingOptions` | `createLinearEasing` のオプション                            |
| `SpringEasingOptions` | `createSpringEasing` のオプション                            |
| `SpringEasing`        | `createSpringEasing` の戻り値（`easing`・`duration`・`css`） |

## ライセンス

MIT
