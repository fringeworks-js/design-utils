import chooseReadableColor from './chooseReadableColor';

describe('chooseReadableColor', () => {
  it('既定の候補は白と黒', () => {
    expect(chooseReadableColor('#2f6fde')).toBe('#ffffff');
    expect(chooseReadableColor('#ffeb3b')).toBe('#000000');
  });

  it('候補を渡された文字列のまま返す', () => {
    expect(chooseReadableColor('#2f6fde', ['white', 'black'])).toBe('white');
  });

  it('同じ比なら先の候補を選ぶ', () => {
    expect(chooseReadableColor('#000000', ['#ffffff', 'white'])).toBe(
      '#ffffff',
    );
  });

  it('読み取れない候補は飛ばす', () => {
    expect(chooseReadableColor('#2f6fde', ['#zzz', '#000000'])).toBe('#000000');
  });

  it('背景を読み取れない場合と、読み取れる候補が無い場合は undefined', () => {
    expect(chooseReadableColor('#zzz')).toBeUndefined();
    expect(chooseReadableColor('#2f6fde', ['#zzz'])).toBeUndefined();
    expect(chooseReadableColor('#2f6fde', [])).toBeUndefined();
  });

  it('minRatio を満たす最初の候補を選ぶ', () => {
    // ピンクは黒の方が比が高い（白 4.3、黒 4.8）が、白も 3 を満たす
    expect(chooseReadableColor('#e91e63')).toBe('#000000');
    expect(chooseReadableColor('#e91e63', undefined, { minRatio: 3 })).toBe(
      '#ffffff',
    );
    // 黄色は白が 3 に届かないので、比が最も高い黒
    expect(chooseReadableColor('#ffeb3b', undefined, { minRatio: 3 })).toBe(
      '#000000',
    );
  });

  it('minRatio を満たす候補が無ければ、比が最も高い候補', () => {
    expect(
      chooseReadableColor('#808080', ['#999999', '#ffffff'], {
        minRatio: 21,
      }),
    ).toBe('#ffffff');
  });

  it('戻り値の型は候補の型', () => {
    expectTypeOf(chooseReadableColor('#2f6fde')).toEqualTypeOf<
      '#ffffff' | '#000000' | undefined
    >();
    expectTypeOf(
      chooseReadableColor('#2f6fde', ['white', 'black']),
    ).toEqualTypeOf<'white' | 'black' | undefined>();
  });
});
