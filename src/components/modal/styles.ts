import { css } from '@emotion/react';

const width = 300;

export const modal = css({
  backgroundColor: 'white',
  border: '1px solid black',
  boxShadow: '0 1px 6px -2px #808080',
  display: 'grid',
  gap: 16,
  left: `calc(50% - ${width / 2}px)`,
  padding: 24,
  position: 'absolute',
  top: 50,
  width,
  '.input': { display: 'grid', gap: 6 },
  '.actions': {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: 'repeat(2, auto)',
  },
});
