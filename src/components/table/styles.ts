import { css } from '@emotion/react';

export const table = css({
  display: 'grid',
  gap: 16,
  '.filters': {
    display: 'flex',
    gap: 12,
    '.filter': { display: 'grid', gap: 4 },
    '#reset': { alignSelf: 'end', padding: '8px 12px' },
  },
  table: {
    thead: { fontWeight: 'bold' },
    tr: { '&:hover': { backgroundColor: 'white' } },
    td: { padding: 6 },
    '.date': { textWrap: 'nowrap' },
    '.actions': {
      display: 'grid',
      gap: 6,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});
