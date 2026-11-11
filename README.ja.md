# @fringeworks/design-utils

`@fringeworks/design-utils` は、デザインの比率に基づくサイズの計算や CSS の値の作成など、Node.js でも使えるデザインのための、誰かにとっては便利なライブラリです。

**[English README is available here](./README.md)**

## インストール

```bash
npm install @fringeworks/design-utils
```

## 使い方

関数・型・定数は、ルート・カテゴリー・関数単位のどのパスからでも同じ名前で import できます。カテゴリーは、下の API の見出し（`ratio`・`unit`・`scale`・`size`・`css`・`color`・`easing`）です。

```ts
import { scaleByGolden } from '@fringeworks/design-utils';
import { scaleByGolden } from '@fringeworks/design-utils/ratio';
import { scaleByGolden } from '@fringeworks/design-utils/ratio/scaleByGolden';
```

関数単位のパスでは、その関数を default import することもできます。

```ts
import scaleByGolden from '@fringeworks/design-utils/ratio/scaleByGolden';
```

DOM には依存しないため、ビルド時のデザイントークンの生成やサーバーサイドでも使えます。

### 小数点以下の桁数

数値を返す関数と、数値を含む文字列を返す関数は、`decimals` オプションで結果を丸めます。デフォルトはどの関数も小数点以下 3 桁です。`decimals` は整数に切り捨て、0〜100 の範囲に収めます。

### 作成する CSS の対応ブラウザー

`createFluidValue` の `cqi`、`createMediaQuery` の範囲の構文、`createColorScale` の `color-mix()`、`createLinearEasing` の `linear()` などは、比較的新しいブラウザーでのみ動作します。作成した値が使えるかどうかは、利用する側の対象ブラウザーに合わせて確認してください。古いブラウザー向けの書き方を選べるオプションがある場合は、各関数の説明に記載しています。

---

## API

### 比率

| 関数                                    | 説明                                           |
| --------------------------------------- | ---------------------------------------------- |
| `scaleByRatio(value, ratio, options?)`  | 値に比率を掛けた値（または割った値）を返す     |
| `scaleByBronze(value, options?)`        | 青銅比（≈ 3.303）の値を返す                    |
| `scaleByDouble(value, options?)`        | 1:2 の値を返す                                 |
| `scaleByGolden(value, options?)`        | 黄金比（≈ 1.618）の値を返す                    |
| `scaleByHarmonic(value, options?)`      | 調和比（4:3 ≈ 1.333）の値を返す                |
| `scaleByMajorSecond(value, options?)`   | 長2度の比（9:8 = 1.125）の値を返す             |
| `scaleByMajorThird(value, options?)`    | 長3度の比（5:4 = 1.25）の値を返す              |
| `scaleByMinorThird(value, options?)`    | 短3度の比（6:5 = 1.2）の値を返す               |
| `scaleByPerfectFifth(value, options?)`  | 完全5度の比（3:2 = 1.5）の値を返す             |
| `scaleByPerfectFourth(value, options?)` | 完全4度の比（調和比と同じ）の値を返す          |
| `scaleByPhoto(value, options?)`         | 写真の比（3:2 = 1.5）の値を返す                |
| `scaleByPlastic(value, options?)`       | プラスチック数の比（≈ 1.325）の値を返す        |
| `scaleByPlatinum(value, options?)`      | 白金比（√3 比と同じ）の値を返す                |
| `scaleBySilver(value, options?)`        | 白銀比（1 + √2 ≈ 2.414）の値を返す             |
| `scaleBySqrt2(value, options?)`         | √2 比（≈ 1.414）の値を返す                     |
| `scaleBySqrt3(value, options?)`         | √3 比（≈ 1.732）の値を返す                     |
| `scaleBySqrt5(value, options?)`         | √5 比（≈ 2.236）の値を返す                     |
| `scaleByUltrawide(value, options?)`     | ウルトラワイドの比（21:9 ≈ 2.333）の値を返す   |
| `scaleByWidescreen(value, options?)`    | ワイドスクリーンの比（16:9 ≈ 1.778）の値を返す |
| `scaleByYamato(value, options?)`        | 大和比（√2 比と同じ）の値を返す                |

#### `scaleByRatio`

```ts
scaleByRatio(value: number, ratio: number, options?: ScaleByRatioOptions): number
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
scaleByDouble(value: number, options?: ScaleByRatioOptions): number
scaleByGolden(value: number, options?: ScaleByRatioOptions): number
scaleByHarmonic(value: number, options?: ScaleByRatioOptions): number
scaleByMajorSecond(value: number, options?: ScaleByRatioOptions): number
scaleByMajorThird(value: number, options?: ScaleByRatioOptions): number
scaleByMinorThird(value: number, options?: ScaleByRatioOptions): number
scaleByPerfectFifth(value: number, options?: ScaleByRatioOptions): number
scaleByPerfectFourth(value: number, options?: ScaleByRatioOptions): number
scaleByPhoto(value: number, options?: ScaleByRatioOptions): number
scaleByPlastic(value: number, options?: ScaleByRatioOptions): number
scaleByPlatinum(value: number, options?: ScaleByRatioOptions): number
scaleBySilver(value: number, options?: ScaleByRatioOptions): number
scaleBySqrt2(value: number, options?: ScaleByRatioOptions): number
scaleBySqrt3(value: number, options?: ScaleByRatioOptions): number
scaleBySqrt5(value: number, options?: ScaleByRatioOptions): number
scaleByUltrawide(value: number, options?: ScaleByRatioOptions): number
scaleByWidescreen(value: number, options?: ScaleByRatioOptions): number
scaleByYamato(value: number, options?: ScaleByRatioOptions): number
```

デザインや建築でよく使われる比率で `scaleByRatio` を呼び出します。オプションは `scaleByRatio` と同じです。

```ts
scaleByGolden(100); // 161.803
scaleByGolden(100, { mode: 'shrink' }); // 61.803
```

#### 用途から選ぶ

Web での主な用途が決まっている比率を、用途ごとにまとめています。「〜とされる」と書いたものは、よく言われるものの根拠が慣習や印象にとどまるものです。

**文字サイズのスケール**（`createModularScale` や `createFluidScale` の `ratio` に定数を渡す）

| 関数                                      | 比      | 主な用途                                                     | 印象                           |
| ----------------------------------------- | ------- | ------------------------------------------------------------ | ------------------------------ |
| `scaleByMajorSecond`                      | 1.125   | ドキュメント、管理画面など情報量の多い UI、モバイル          | 控えめ、落ち着いている         |
| `scaleByMinorThird`                       | 1.2     | アプリの UI、ダッシュボード、モバイル                        | 控えめ、実用的                 |
| `scaleByMajorThird`                       | 1.25    | ブログ、一般的なサイト。ツールの既定値になっていることが多い | 標準的                         |
| `scaleByPerfectFourth`・`scaleByHarmonic` | ≈ 1.333 | コーポレートサイト、デスクトップ向けの記事                   | メリハリがある                 |
| `scaleBySqrt2`                            | ≈ 1.414 | 1.333 と 1.5 の中間の段差がほしいとき                        |                                |
| `scaleByPerfectFifth`                     | 1.5     | LP、マーケティングページ、ポートフォリオ                     | 強い                           |
| `scaleByGolden`                           | ≈ 1.618 | 見出しを大胆に見せたい、ビジュアル重視のページ               | 大胆。調和が取れているとされる |

画面が小さいほど小さい比、大きいほど大きい比を使うことが多く、`createFluidScale` で幅に応じて切り替えられます（例: モバイルは `MINOR_THIRD_RATIO`、デスクトップは `PERFECT_FOURTH_RATIO`）。

**縦横比**

| 関数                            | 比   | 主な用途                                                             |
| ------------------------------- | ---- | -------------------------------------------------------------------- |
| `scaleByWidescreen`             | 16:9 | 動画の埋め込み（YouTube など）、ヒーロー画像、スライド               |
| `scaleByHarmonic`               | 4:3  | スマートフォンのカメラの標準の縦横比。ユーザーが投稿した写真の表示枠 |
| `scaleByPhoto`                  | 3:2  | 一眼レフ・ミラーレスカメラの写真、商品写真やギャラリー               |
| `scaleByUltrawide`              | 21:9 | 映画風の横長のバナーやビジュアル                                     |
| `scaleBySqrt2`・`scaleByYamato` | 1:√2 | 印刷用のレイアウト（`@page`）、PDF のサムネイル                      |

**余白・レイアウト**

| 関数                              | 主な用途                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `scaleByDouble`                   | 4・8・16・32 と倍々に増やす余白のスケール（8pt グリッドなど）                                   |
| `scaleByPerfectFifth`             | 本文の行の高さ（WCAG 1.4.12 は、行の高さを文字サイズの 1.5 倍にしても崩れないことを求めている） |
| `scaleByGolden`                   | 2カラムの分割（メインとサイドバーを 61.8 : 38.2 にするなど）                                    |
| `scaleBySqrt3`・`scaleByPlatinum` | 六角形のグリッドやアイソメトリックのイラストの計算                                              |

**由来を重視して選ぶ**

`scaleByYamato` は日本の建築やキャラクターデザインで使われ、日本人になじみやすく安定した印象を与えるとされます。`scaleBySilver`・`scaleByBronze`・`scaleBySqrt5`・`scaleByPlastic` は Web での決まった用途はなく、数学的な性質や建築（プラスチック数は建築家 Dom Hans van der Laan の寸法体系）に由来する比率です。

#### 定数

| 定数                   | 説明                                   |
| ---------------------- | -------------------------------------- |
| `GOLDEN_RATIO`         | 黄金比（≈ 1.618）                      |
| `SILVER_RATIO`         | 白銀比（1 + √2 ≈ 2.414）               |
| `BRONZE_RATIO`         | 青銅比（≈ 3.303）                      |
| `PLATINUM_RATIO`       | 白金比（`SQRT3_RATIO` と同じ）         |
| `PLASTIC_RATIO`        | プラスチック数の比（≈ 1.325）          |
| `SQRT2_RATIO`          | √2 比（≈ 1.414）                       |
| `SQRT3_RATIO`          | √3 比（≈ 1.732）                       |
| `SQRT5_RATIO`          | √5 比（≈ 2.236）                       |
| `YAMATO_RATIO`         | 大和比（`SQRT2_RATIO` と同じ）         |
| `HARMONIC_RATIO`       | 調和比（4:3 ≈ 1.333）                  |
| `DOUBLE_RATIO`         | 1:2                                    |
| `MAJOR_SECOND_RATIO`   | 長2度の比（9:8 = 1.125）               |
| `MINOR_THIRD_RATIO`    | 短3度の比（6:5 = 1.2）                 |
| `MAJOR_THIRD_RATIO`    | 長3度の比（5:4 = 1.25）                |
| `PERFECT_FOURTH_RATIO` | 完全4度の比（`HARMONIC_RATIO` と同じ） |
| `PERFECT_FIFTH_RATIO`  | 完全5度の比（3:2 = 1.5）               |
| `WIDESCREEN_RATIO`     | ワイドスクリーンの比（16:9 ≈ 1.778）   |
| `PHOTO_RATIO`          | 写真の比（3:2 = 1.5）                  |
| `ULTRAWIDE_RATIO`      | ウルトラワイドの比（21:9 ≈ 2.333）     |

#### 型

| 型                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 説明                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `ScaleByRatioOptions`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `scaleByRatio` のオプション  |
| `ScaleByBronzeOptions`、`ScaleByDoubleOptions`、`ScaleByGoldenOptions`、`ScaleByHarmonicOptions`、`ScaleByMajorSecondOptions`、`ScaleByMajorThirdOptions`、`ScaleByMinorThirdOptions`、`ScaleByPerfectFifthOptions`、`ScaleByPerfectFourthOptions`、`ScaleByPhotoOptions`、`ScaleByPlasticOptions`、`ScaleByPlatinumOptions`、`ScaleBySilverOptions`、`ScaleBySqrt2Options`、`ScaleBySqrt3Options`、`ScaleBySqrt5Options`、`ScaleByUltrawideOptions`、`ScaleByWidescreenOptions`、`ScaleByYamatoOptions` | `ScaleByRatioOptions` と同じ |

### 単位

| 関数                                                      | 説明                                                       |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| `convertUnit(value, from, to, options?)`                  | CSS の長さの単位を変換する（`Q` に対応）                   |
| `convertTrackingToEm(tracking, options?)`                 | トラッキング（1/1000em）を `letter-spacing` の `em` にする |
| `convertLeadingToLineHeight(leading, fontSize, options?)` | 行送りを単位なしの `line-height` にする                    |

#### `convertUnit`

```ts
convertUnit(value: number, from: CssUnit, to: CssUnit, options?: ConvertUnitOptions): number
```

CSS の長さの単位を変換します。絶対単位は CSS の定義（1in = 96px = 72pt）に従います。`Q` は 1/4mm で、写植・DTP の級数や歯送りの値を CSS の値に変換できます。

```ts
convertUnit(24, 'px', 'rem'); // 1.5
convertUnit(13, 'Q', 'pt'); // 9.213
[12, 24].map((value) => convertUnit(value, 'px', 'rem')); // [0.75, 1.5]
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
createModularScale(options?: CreateModularScaleOptions): (step: number) => number
```

モジュラースケールの関数を作ります。返す関数は段階（`step`）を受け取り、`base × ratio ^ step` を返します。

`base` に配列を指定すると、複数の基準値を組み合わせたスケール（double stranded）になります。各基準値から作ったスケールを1つに合わせ、`base` の最初の値を段階 `0` として、小さい順に段階を振ります。この場合、返す関数に渡せる段階は整数だけです。

```ts
const scale = createModularScale({ ratio: HARMONIC_RATIO });
scale(0); // 16
scale(2); // 28.444
scale(-1); // 12

const double = createModularScale({ base: [16, 24], ratio: 2 });
[0, 1, 2, 3].map(double); // [16, 24, 32, 48]
```

| オプション  | 型                            | 説明                                                                                    |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| `base?`     | `number \| readonly number[]` | 基準値。配列の場合は複数の基準値を組み合わせる。デフォルトは `16`                       |
| `ratio?`    | `number`                      | 比率。正の数で、`base` が配列の場合は 1 より大きい値にする。デフォルトは `GOLDEN_RATIO` |
| `decimals?` | `number`                      | 小数点以下の桁数。デフォルトは `3`                                                      |

#### `createFluidValue`

```ts
createFluidValue(min: number, max: number, options?: CreateFluidValueOptions): string
```

画面（またはコンテナー）の幅に応じて `min` から `max` まで変化する値を、CSS の `clamp()` の文字列で返します。`min` と `max` はデザインカンプの値をそのまま使えるように px で指定します。`min` が `max` より大きい場合は、幅が広がるほど小さくなる値になります。`min` と `max` が同じ場合は、`clamp()` ではなくその値を返します。

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
createFluidScale(options: CreateFluidScaleOptions): (step: number) => string
```

`createModularScale` と `createFluidValue` を組み合わせ、幅に応じて基準値と比率が変わるスケールの関数を作ります。返す関数は段階（`step`）を受け取り、`min` のスケールの値から `max` のスケールの値まで変化する `clamp()` の文字列を返します。

```ts
const scale = createFluidScale({
  min: { base: 16, ratio: 1.2 },
  max: { base: 20, ratio: 1.25 },
});
scale(0); // 'clamp(1rem, 0.896rem + 0.442vw, 1.25rem)'
```

| オプション | 型                                            | 説明                            |
| ---------- | --------------------------------------------- | ------------------------------- |
| `min`      | `Omit<CreateModularScaleOptions, 'decimals'>` | `minViewport` でのスケール      |
| `max`      | `Omit<CreateModularScaleOptions, 'decimals'>` | `maxViewport` でのスケール      |
| その他     |                                               | `createFluidValue` のオプション |

#### 型

| 型                          | 説明                              |
| --------------------------- | --------------------------------- |
| `CreateModularScaleOptions` | `createModularScale` のオプション |
| `CreateFluidValueOptions`   | `createFluidValue` のオプション   |
| `CreateFluidScaleOptions`   | `createFluidScale` のオプション   |

### サイズ

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

カラムグリッドで `span` 列分の幅（間の列の間隔を含む）を返します。`span` が 0 以下の場合は `0` を返します。デザインカンプの数値の確認などに使えます。

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
appendUnit(value: number, unit?: string): string
appendUnit<T extends string | null | undefined>(value: T, unit?: string): T
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

つないだ結果が同じ名前になるキー（`{ a: { b: 1 }, 'a-b': 2 }` など）は検出せず、後の値で上書きします。

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
createMediaQuery<K extends string>(breakpoints: Readonly<Record<K, number>>, options?: CreateMediaQueryOptions): MediaQuery<K>
```

ブレークポイントの名前と幅（px）から、`@media` / `@container` のクエリーを作る関数を返します。CSS-in-JS のキーなどに使えます。

```ts
const mq = createMediaQuery({ sm: 640, md: 768, lg: 1024 });
mq.up('md'); // '@media (width >= 768px)'
mq.down('md'); // '@media (width < 768px)'
mq.between('sm', 'lg'); // '@media (640px <= width < 1024px)'
mq.only('md'); // '@media (768px <= width < 1024px)'
```

| メソッド            | 説明                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `up(name)`          | `name` の幅以上                                                                                    |
| `down(name)`        | `name` の幅未満                                                                                    |
| `between(min, max)` | `min` の幅以上、`max` の幅未満。`min` の幅のほうが大きい場合は入れ替え、同じ幅の場合はエラーにする |
| `only(name)`        | `name` の幅以上、次に大きいブレークポイントの幅未満。一番大きいブレークポイントでは `up` と同じ    |

| オプション       | 型                       | 説明                                                                                                                                                                    |
| ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type?`          | `'media' \| 'container'` | 作るクエリーの種類。デフォルトは `'media'`                                                                                                                              |
| `containerName?` | `string`                 | コンテナーの名前（`container-name`）。`type` が `'container'` の場合だけ使い、`@container sidebar (…)` のように出力する。指定しない場合は一番近いコンテナーが対象になる |
| `unit?`          | `'px' \| 'em'`           | 出力の単位。`em` は 16px を 1em として換算する。デフォルトは `'px'`                                                                                                     |
| `syntax?`        | `'range' \| 'min-max'`   | `'range'`: 範囲の構文、`'min-max'`: `min-width` / `max-width`（範囲の構文に対応していないブラウザー向け。上限は 0.02px 小さい値にする）。デフォルトは `'range'`         |

#### 型

| 型                                  | 説明                                      |
| ----------------------------------- | ----------------------------------------- |
| `DesignTokens`                      | `createCssVariables` に渡すトークン       |
| `CreateCssVariablesOptions`         | `createCssVariables` のオプション         |
| `CreateCssVariableReferenceOptions` | `createCssVariableReference` のオプション |
| `CreateMediaQueryOptions`           | `createMediaQuery` のオプション           |
| `MediaQuery<K>`                     | `createMediaQuery` が返す関数             |

### 色

| 関数                                                     | 説明                                                     |
| -------------------------------------------------------- | -------------------------------------------------------- |
| `createColorScale(color, options?)`                      | 1つの色から段階ごとの色を `color-mix()` の文字列で作る   |
| `adjustColor(color, options)`                            | 色の明るさ・彩度・色相を OKLCH で変える                  |
| `changeAlpha(color, alpha)`                              | 色の透明度を置き換える                                   |
| `mixColors(color, other, ratio)`                         | 2つの色を OKLCH で混ぜる                                 |
| `calculateContrastRatio(color, other, options?)`         | 2つの色の WCAG 2 のコントラスト比を返す                  |
| `ensureContrast(color, against, ratio)`                  | 比べる色とのコントラスト比が届くまで、色の明るさを変える |
| `chooseReadableColor(background, candidates?, options?)` | 背景の色の上で最も読みやすい色を候補から選ぶ             |
| `createAccentColor(color, options?)`                     | 1つの色に合うアクセントカラーを作る                      |
| `createHarmonyColors(color, options?)`                   | 色相環の上で調和の関係にある色を作る                     |

色の関数は、色をどこで計算するかで2つに分かれます。

- **CSS で計算する**（`createColorScale`）: CSS の色の関数の文字列を返し、色の計算はブラウザーが行います。`var(--brand)` のような CSS 変数を使えますが、作った関数が対象のブラウザーで使えることが前提です。
- **JavaScript で計算する**（そのほか）: 色を計算して、古いブラウザーでも使える16進数の色（`#rrggbb`。透明度が 1 未満なら `#rrggbbaa`）を返します。受け取るのは具体的な色（`AbsoluteColor`。16進数の色・`rgb()` や `oklch()` などの色の関数・色の名前）で、`var()` や `currentColor` などの描くときまで決まらない値は型エラーになります。読み取れない色（`'#zzz'` など）を渡すと `undefined` を返します。sRGB に収まらない色は、彩度を下げて収めます（CSS Color 4 の gamut mapping）。

JavaScript での計算には、内部で [culori](https://culorijs.org/) を使っています。

#### `createColorScale`

```ts
createColorScale<const S extends number = DefaultColorScaleStep>(color: string, options?: CreateColorScaleOptions<S>): Record<S, string>
```

1つの色から、段階ごとの色を CSS の `color-mix()` の文字列で作ります。色の計算はブラウザーが行うため、`var(--brand)` のような CSS 変数を元の色に使えます。テーマの切り替えで元の色だけを差し替えるパレットを作れます。

段階 `0` を `light`、`baseStep` を元の色、`1000` を `dark` として、その間は段階に比例した割合で色を混ぜます。戻り値のキーは `steps` の型になります。

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

| オプション  | 型             | 説明                                                        |
| ----------- | -------------- | ----------------------------------------------------------- |
| `steps?`    | `readonly S[]` | 作る段階。デフォルトは `[50, 100, 200, …, 900, 950]`        |
| `baseStep?` | `number`       | 元の色をそのまま使う段階。デフォルトは `500`                |
| `space?`    | `string`       | `color-mix()` で色を混ぜる色空間。デフォルトは `'oklch'`    |
| `light?`    | `string`       | `baseStep` より小さい段階で混ぜる色。デフォルトは `'white'` |
| `dark?`     | `string`       | `baseStep` より大きい段階で混ぜる色。デフォルトは `'black'` |
| `decimals?` | `number`       | 割合（%）の小数点以下の桁数。デフォルトは `3`               |

#### `adjustColor`

```ts
adjustColor(color: AbsoluteColor, options: AdjustColorOptions): HexColor | undefined
```

色の明るさ・彩度・色相を OKLCH で変えます。各オプションの値を OKLCH の値に足し、明るさは 0〜1、彩度は 0 以上に収め、色相は 0〜360 度で回します。無彩色（白・灰色など）は色相を持たないので、色相を回しても変わりません。

```ts
adjustColor('#2f6fde', { lightness: -0.06 }); // 少し暗い青
adjustColor('#2f6fde', { chroma: -0.15 }); // 青みを帯びた灰色
```

| オプション   | 型       | 説明                                                                          |
| ------------ | -------- | ----------------------------------------------------------------------------- |
| `lightness?` | `number` | OKLCH の明るさ（0〜1）に足す値。負の数で暗くする。デフォルトは `0`            |
| `chroma?`    | `number` | OKLCH の彩度（0 以上。sRGB の色はおよそ 0.37 まで）に足す値。デフォルトは `0` |
| `hue?`       | `number` | OKLCH の色相に足す角度（度）。デフォルトは `0`                                |

#### `changeAlpha`

```ts
changeAlpha(color: AbsoluteColor, alpha: number): HexColor | undefined
```

色の透明度を `alpha`（0 が透明、1 が不透明）に置き換えます。範囲の外の値は端に収めます。

```ts
changeAlpha('#2f6fde', 0.5); // '#2f6fde80'
```

#### `mixColors`

```ts
mixColors(color: AbsoluteColor, other: AbsoluteColor, ratio: number): HexColor | undefined
```

2つの色を OKLCH で混ぜます。`ratio` は `color` の割合（0 で `other` だけ、1 で `color` だけ）で、CSS の `color-mix(in oklch, color <ratio>, other)` と同じ結果になります。CSS と同じく、透明度は色に掛けた値（premultiplied）で混ぜ、無彩色には相手の色相を使います。どちらかの色を読み取れない場合は `undefined` を返します。

```ts
mixColors('#2f6fde', '#ffffff', 0.2); // '#d5e3fb'（青が 20%、白が 80%）
```

#### `calculateContrastRatio`

```ts
calculateContrastRatio(color: AbsoluteColor, other: AbsoluteColor, options?: CalculateContrastRatioOptions): number | undefined
```

2つの色の WCAG 2 のコントラスト比（1〜21）を返します。透明度は考えず、不透明な色として比べます。どちらかの色を読み取れない場合は `undefined` を返します。

```ts
calculateContrastRatio('#2f6fde', '#ffffff'); // 4.72
```

| オプション  | 型       | 説明                               |
| ----------- | -------- | ---------------------------------- |
| `decimals?` | `number` | 小数点以下の桁数。デフォルトは `3` |

#### `ensureContrast`

```ts
ensureContrast(color: AbsoluteColor, against: AbsoluteColor, ratio: number): HexColor | undefined
```

`against` との WCAG 2 のコントラスト比が `ratio`（1〜21 に収める）に届くまで、色の明るさを OKLCH で変えます。すでに届いている場合は、元の色をそのまま返します。届いていない場合は、`against` が明るい色なら暗く、暗い色なら明るくし、届く中で最も元の色に近い明るさにします。白・黒まで変えても届かない場合は、白・黒まで変えた色を返します。彩度と色相はそのままです。どちらかの色を読み取れない場合は `undefined` を返します。

薄い色の枠やフォーカスの線を、白い背景の上で見分けられるようにするときなどに使います。

```ts
ensureContrast('#2f6fde', '#ffffff', 3); // '#2f6fde'（すでに届いている）
ensureContrast('#ffeb3b', '#ffffff', 3); // '#a79500'（暗くした黄色）
```

#### `chooseReadableColor`

```ts
chooseReadableColor<const C extends AbsoluteColor = '#ffffff' | '#000000'>(background: AbsoluteColor, candidates?: readonly C[], options?: ChooseReadableColorOptions): C | undefined
```

`background` の上で WCAG 2 のコントラスト比が最も高い候補を選び、渡された文字列のまま返します。同じ比の候補があれば、先の候補を選びます。読み取れない候補は飛ばします。`background` を読み取れない場合と、読み取れる候補が無い場合は `undefined` を返します。

`minRatio` を指定すると、候補を順に見て、比が `minRatio` 以上の最初の候補を選びます（満たす候補が無ければ、比が最も高い候補）。白か黒かを選ぶとき、比がわずかに低くても白を使いたい中間の明るさの色（ピンクなど）で使います。

```ts
chooseReadableColor('#2f6fde'); // '#ffffff'
chooseReadableColor('#ffeb3b', ['white', 'black']); // 'black'
chooseReadableColor('#e91e63'); // '#000000'（白 4.3、黒 4.8）
chooseReadableColor('#e91e63', undefined, { minRatio: 3 }); // '#ffffff'
```

| 引数          | 型                           | 説明                                            |
| ------------- | ---------------------------- | ----------------------------------------------- |
| `background`  | `AbsoluteColor`              | 背景の色                                        |
| `candidates?` | `readonly C[]`               | 候補の色。デフォルトは `['#ffffff', '#000000']` |
| `options?`    | `ChooseReadableColorOptions` | 下記のオプション                                |

| オプション  | 型       | 説明                                                           |
| ----------- | -------- | -------------------------------------------------------------- |
| `minRatio?` | `number` | 満たせば選ぶコントラスト比。省略すると、比が最も高い候補を選ぶ |

#### `createAccentColor`

```ts
createAccentColor(color: AbsoluteColor, options?: CreateAccentColorOptions): HexColor | undefined
```

1つの色（プライマリカラーなど）に合うアクセントカラーを作ります。プライマリカラーを渡すだけで、色彩調和論・Material Design 3・WCAG に基づいた色が得られます。`color` か `background` を読み取れない場合は `undefined` を返します。

色相を OKLCH で回し（既定は 60°。Material Design 3 の tertiary と同じ角度）、明るさを背景とのコントラスト比で決めます。アクセントカラーには、デザインシステムによって2つの意味があるので、`emphasis` で選びます。

- **`'strong'`（既定）**: 目立たせる色。プライマリと並べて、別の色として目に留まります。彩度は元の色のままです。元の色より濃くして（背景から遠ざけて）、背景とのコントラスト比を 4.5 以上にします。白い文字を乗せても、WCAG 1.4.3 の基準を満たします。元の色がすでに十分濃い場合（背景との比が 8 以上）は、それ以上濃くすると黒（暗い背景では白）に近づくので、背景に近づけて淡くします。どちらの向きでも、元の色との OKLCH の明るさの差をおよそ 0.05 以上にします
- **`'subtle'`**: 控えめな色。ホバー・選択中の項目の背景など、背景に近い面に使います。彩度は元の色の 1/4 です。背景とのコントラスト比を、明るい背景では 1.1、暗い背景では 1.3 にします（暗い背景では差が見えにくいので、離しています）

```ts
createAccentColor('#2563eb'); // '#971ca7'
createAccentColor('#2563eb', { emphasis: 'subtle' }); // '#ffefff'
createAccentColor('#60a5fa', { background: '#121212' }); // '#d495f1'
createAccentColor('#2563eb', { hue: 'complementary' }); // '#835a00'
```

使うときに知っておくこと

- `'subtle'` の面の上の文字は、白と黒の読みやすい方（`chooseReadableColor`）にしてください。`'strong'` の色の文字を乗せると、背景とのコントラスト比 4.5 から面の分だけ下がり、WCAG 1.4.3 の基準に届かないことがあります
- `'strong'` は、元の色の背景との比が 8 の前後で、濃くするか淡くするかが入れ替わります。比がわずかに違う2つの色で、アクセントの明るさが大きく違うことがあります
- 無彩色（白・灰色・黒）は色相を持たないので、明るさだけが違う無彩色になります。色の付いたアクセントが欲しい場合は、色の付いた色を渡してください
- 明るさの差（およそ 0.05 以上）は、sRGB に収めるときに少し変わることがあります。背景とのコントラスト比は、収めた後の色で確かめています
- プライマリ・セカンダリ・中立色などを揃えた配色全体が欲しい場合は、[@material/material-color-utilities](https://www.npmjs.com/package/@material/material-color-utilities) が使えます。`createAccentColor` は、利用者が選んだ色をそのまま活かして、それに合う1色を返します

| オプション    | 型                       | 説明                                                                                        |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| `emphasis?`   | `AccentEmphasis`         | `'strong'`（目立たせる色）か `'subtle'`（控えめな色）。デフォルトは `'strong'`              |
| `background?` | `AbsoluteColor`          | アクセントカラーを置く背景の色。デフォルトは `'#ffffff'`                                    |
| `hue?`        | `number \| ColorHarmony` | 元の色から回す色相の角度（度）。調和の関係の名前でも指定できる（下の表）。デフォルトは `60` |

`hue` の選び方の目安です。どれを選んでも、明るさは `emphasis` の規則で決めます。

| `hue`                  | 角度 | 選ぶとき                                       |
| ---------------------- | ---- | ---------------------------------------------- |
| 省略                   | 60°  | プライマリと組で使って、なじみつつ目立たせたい |
| `'analogous'`          | 30°  | プライマリになじむ控えめなアクセントにしたい   |
| `'square'`             | 90°  | 三分割と類似色の間                             |
| `'triadic'`            | 120° | はっきり違う色にしたい                         |
| `'splitComplementary'` | 150° | 対比を出しつつ、補色より穏やかにしたい         |
| `'complementary'`      | 180° | 最も強く対比させたい                           |

#### `createHarmonyColors`

```ts
createHarmonyColors(color: AbsoluteColor, options?: CreateHarmonyColorsOptions): HexColor[] | undefined
```

色相環の上で調和の関係にある色を、OKLCH で色相を回して作ります。元の色を先頭に、元の色からの角度の小さい順に並べます。明るさと彩度は元の色のままです。無彩色（白・灰色・黒）は色相を持たないので、同じ色が並びます。`color` を読み取れない場合は `undefined` を返します。

```ts
createHarmonyColors('#2563eb'); // ['#2563eb', '#d10e2e', '#008b00']
createHarmonyColors('#2563eb', { harmony: 'analogous' }); // ['#2563eb', '#7a49df', '#007bb2']
```

明るさを変えないので、背景とのコントラストは保証しません。背景の上で見分けられるようにしたい場合は、`ensureContrast` と組み合わせてください。

| オプション | 型             | 説明                                 |
| ---------- | -------------- | ------------------------------------ |
| `harmony?` | `ColorHarmony` | 調和の関係。デフォルトは `'triadic'` |

`harmony` の選び方の目安です。

| `harmony`              | 返す色（元の色からの角度） | 選ぶとき                                                                                           |
| ---------------------- | -------------------------- | -------------------------------------------------------------------------------------------------- |
| `'analogous'`          | 0°・30°・330°              | なじませたい、落ち着いた統一感を出したい。色によっては見分けにくいので、区別が要る用途には向かない |
| `'complementary'`      | 0°・180°                   | 2色をはっきり対比させたい。赤と緑のように、色覚の多様性で見分けにくい組み合わせになることがある    |
| `'splitComplementary'` | 0°・150°・210°             | 対比を出しつつ、補色より穏やかにしたい                                                             |
| `'triadic'`（既定）    | 0°・120°・240°             | 3つのものを見分けたい（グラフの系列、カテゴリーの色分けなど）                                      |
| `'square'`             | 0°・90°・180°・270°        | 4つのものを見分けたい。にぎやかになりやすいので、1色を主にし、ほかは控えめに使う                   |

#### 型

| 型                              | 説明                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `CreateColorScaleOptions<S>`    | `createColorScale` のオプション                                                                        |
| `DefaultColorScaleStep`         | `createColorScale` の既定の段階（`50 \| 100 \| … \| 950`）                                             |
| `AdjustColorOptions`            | `adjustColor` のオプション                                                                             |
| `CalculateContrastRatioOptions` | `calculateContrastRatio` のオプション                                                                  |
| `ChooseReadableColorOptions`    | `chooseReadableColor` のオプション                                                                     |
| `CreateAccentColorOptions`      | `createAccentColor` のオプション                                                                       |
| `AccentEmphasis`                | アクセントカラーの強さ（`'strong' \| 'subtle'`）                                                       |
| `CreateHarmonyColorsOptions`    | `createHarmonyColors` のオプション                                                                     |
| `ColorHarmony`                  | 調和の関係（`'analogous' \| 'complementary' \| 'splitComplementary' \| 'triadic' \| 'square'`）        |
| `AbsoluteColor`                 | 色の関数が受け取る具体的な色（`HexColor \| FunctionalColor \| NamedColor`。`@fringeworks/types` の型） |
| `HexColor`                      | 16進数の色（`#${string}`）。色の関数が返す色（`@fringeworks/types` の型）                              |
| `FunctionalColor`               | `rgb()`・`hsl()`・`oklch()` などの色の関数で書いた色（`@fringeworks/types` の型）                      |
| `NamedColor`                    | CSS の色の名前（148 個の名前と `transparent`。`@fringeworks/types` の型）                              |

### イージング

| 関数                                   | 説明                                                       |
| -------------------------------------- | ---------------------------------------------------------- |
| `createLinearEasing(easing, options?)` | JavaScript のイージング関数を CSS の `linear()` に変換する |
| `createSpringEasing(options?)`         | ばねの動きのイージング関数・時間・`linear()` を作る        |

#### `createLinearEasing`

```ts
createLinearEasing(easing: EasingFunction, options?: CreateLinearEasingOptions): string
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
createSpringEasing(options?: CreateSpringEasingOptions): SpringEasing
```

ばねの物理モデルから、イージング関数（`easing`）・ばねが止まるまでの時間（`duration`、ms）・CSS の `linear()` の文字列（`css`）を作ります。`duration` を `transition-duration` などに指定すると、ばねと同じ速さで動きます。`maxDuration` までにばねが止まらない場合は `maxDuration` で打ち切り、最後に目標の位置へ移ります。

```ts
const { css, duration } = createSpringEasing({ stiffness: 200, damping: 15 });
element.style.transition = `transform ${duration}ms ${css}`;
```

| オプション     | 型       | 説明                                                                    |
| -------------- | -------- | ----------------------------------------------------------------------- |
| `stiffness?`   | `number` | ばねの硬さ。大きいほど速く動く。デフォルトは `100`                      |
| `damping?`     | `number` | 減衰の強さ。小さいほど大きく揺れる。デフォルトは `10`                   |
| `mass?`        | `number` | 質量。大きいほどゆっくり動く。デフォルトは `1`                          |
| `velocity?`    | `number` | 初速度（全体の移動量を 1 とした、1 秒あたりの移動量）。デフォルトは `0` |
| `maxDuration?` | `number` | 止まるまでの時間を探す上限（ms）。デフォルトは `60000`                  |
| その他         |          | `createLinearEasing` のオプション                                       |

#### 型

| 型                          | 説明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `EasingFunction`            | `(t: number) => number`                                      |
| `CreateLinearEasingOptions` | `createLinearEasing` のオプション                            |
| `CreateSpringEasingOptions` | `createSpringEasing` のオプション                            |
| `SpringEasing`              | `createSpringEasing` の戻り値（`easing`・`duration`・`css`） |

## ライセンス

MIT
