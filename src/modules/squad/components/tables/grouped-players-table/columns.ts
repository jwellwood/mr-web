import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'nationality',
    type: 'nationality',
    label: '',
    styles: {
      width: 30,
    },
  },
  {
    id: 'position',
    label: '',
    styles: {
      width: 24,
    },
  },
  {
    id: 'name',
    type: 'link',
    label: '',
    styles: {
      align: 'left',
    },
  },
  {
    id: 'dob',
    label: '',
    styles: {
      width: 60,
      align: 'right',
      color: 'label',
    },
  },
] as const;
