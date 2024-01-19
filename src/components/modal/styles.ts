import { css } from '@emotion/react';

const width = 300;

export const modal = css({
  backgroundColor: 'white',
  border: '1px solid black',
  boxShadow: '0 1px 6px -2px #808080',
  left: `calc(50% - ${width / 2}px)`,
  padding: 16,
  position: 'absolute',
  top: '50%',
  width,
  '#form': {
    display: 'grid',
    gap: 4,
  },
});
