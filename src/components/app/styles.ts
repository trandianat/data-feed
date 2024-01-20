import { css } from '@emotion/react';

export const app = css({
  display: 'grid',
  gap: 16,
  position: 'relative',
  '.min-width': { width: 'fit-content' },
  '.filters': {
    display: 'flex',
    gap: 16,
    '.filter': {
      display: 'grid',
      gap: 4,
      select: { maxWidth: 'fit-content' },
    },
    '#reset': { alignSelf: 'end', height: 'fit-content', padding: '8px 12px' },
  },
  table: {
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
});
