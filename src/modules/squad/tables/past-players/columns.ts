import { ColumnConfig } from '../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'position',
    label: '',
    styles: {
      width: 24,
    },
  },
  {
    id: 'nationality',
    type: 'nationality',
    label: '',
    styles: {
      width: 30,
    },
  },
  {
    id: 'image',
    type: 'image',
    label: '',
    styles: {
      width: 28,
    },
  },
  {
    id: 'name',
    type: 'link',
    label: '',
    styles: {
      align: 'left',
      border: true,
    },
  },
  {
    id: 'joined',
    label: 'From',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'left',
    label: 'To',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'seasons',
    label: 'Seas',
    styles: {
      width: 20,
      background: true,
    },
  },
] as const;
