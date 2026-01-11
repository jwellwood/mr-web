export const columns = [
  {
    id: 'isStarter',
    numeric: false,
    label: '',
  },
  {
    id: 'position',
    numeric: false,
    label: '',
    width: 40,
  },
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 150,
  },
  {
    id: 'goals',
    numeric: true,
    label: 'Goals',
  },
  {
    id: 'assists',
    numeric: true,
    label: 'Assists',
  },
  {
    id: 'conceded',
    numeric: true,
    label: 'Conc',
  },
  {
    id: 'mvp',
    numeric: false,
    label: 'MVP',
  },
] as const;
