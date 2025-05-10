import { IHeadCell } from '../../../components/tables/types';

export const statsTableColumnsBasic: IHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 100,
    padding: '4px 16px',
  },
  {
    id: 'apps',
    numeric: true,
    label: 'Apps',
    width: 50,
  },
  {
    id: 'goals',
    numeric: true,
    label: 'Goals',
    width: 50,
  },
  {
    id: 'assists',
    numeric: true,
    label: 'Assists',
    width: 50,
  },

  {
    id: 'mvp',
    numeric: true,
    label: 'MVPs',
    width: 50,
  },

  {
    id: 'conceded',
    numeric: true,
    label: 'Conc',
    width: 50,
  },
  {
    id: 'cleanSheets',
    numeric: true,
    label: 'C/S',
    width: 50,
  },
];
