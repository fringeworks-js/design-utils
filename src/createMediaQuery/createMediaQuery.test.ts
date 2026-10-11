import createMediaQuery from './createMediaQuery';

const breakpoints = { sm: 640, md: 768, lg: 1024 };

describe('createMediaQuery', () => {
  describe('デフォルトは範囲の構文の @media', () => {
    const mq = createMediaQuery(breakpoints);

    it('up', () => {
      expect(mq.up('md')).toBe('@media (width >= 768px)');
    });

    it('down', () => {
      expect(mq.down('md')).toBe('@media (width < 768px)');
    });

    it('between', () => {
      expect(mq.between('sm', 'lg')).toBe('@media (640px <= width < 1024px)');
    });

    it('only は次に大きいブレークポイントまで', () => {
      expect(mq.only('md')).toBe('@media (768px <= width < 1024px)');
      expect(mq.only('lg')).toBe('@media (width >= 1024px)');
    });

    it('定義していない名前はエラー', () => {
      expect(() => mq.up('xl' as 'md')).toThrow(RangeError);
    });
  });

  it('only はオブジェクトの順序ではなく幅の順で次を決める', () => {
    const mq = createMediaQuery({ lg: 1024, sm: 640, md: 768 });
    expect(mq.only('sm')).toBe('@media (640px <= width < 768px)');
  });

  describe('syntax: min-max', () => {
    const mq = createMediaQuery(breakpoints, { syntax: 'min-max' });

    it('up / down', () => {
      expect(mq.up('md')).toBe('@media (min-width: 768px)');
      expect(mq.down('md')).toBe('@media (max-width: 767.98px)');
    });

    it('between / only', () => {
      expect(mq.between('sm', 'lg')).toBe(
        '@media (min-width: 640px) and (max-width: 1023.98px)',
      );
      expect(mq.only('lg')).toBe('@media (min-width: 1024px)');
    });
  });

  it('unit: em', () => {
    const mq = createMediaQuery(breakpoints, { unit: 'em' });
    expect(mq.up('md')).toBe('@media (width >= 48em)');
    const minMax = createMediaQuery(breakpoints, {
      unit: 'em',
      syntax: 'min-max',
    });
    expect(minMax.down('md')).toBe('@media (max-width: 47.99875em)');
  });

  it('type: container', () => {
    const mq = createMediaQuery(breakpoints, { type: 'container' });
    expect(mq.up('md')).toBe('@container (width >= 768px)');
  });
});
