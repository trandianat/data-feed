import { css } from '@emotion/react';

export const app = css({
  display: 'grid',
  gap: 16,
  position: 'relative',
  table: {
    border: '1px solid black',
    thead: { fontWeight: 'bold' },
    tr: { '&:hover': { backgroundColor: 'white' } },
    td: { padding: 6 },
    '.date': { textWrap: 'nowrap' },
    '.actions': {
      display: 'grid',
      gap: 6,
      gridTemplateColumns: 'repeat(2, auto)',
    },
  },
  '.new': { width: 'fit-content' },
});
