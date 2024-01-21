import { css } from '@emotion/react';

export const modal = (height: number) =>
  css({
    alignItems: 'center',
    display: 'flex',
    height,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    '.modal': {
      backgroundColor: 'white',
      border: '1px solid black',
      boxShadow: '0 1px 6px -2px #808080',
      display: 'grid',
      gap: 16,
      height: 'fit-content',
      padding: 24,
      width: 300,
      '.input': { display: 'grid', gap: 6 },
      '.actions': {
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(2, auto)',
      },
    },
  });
