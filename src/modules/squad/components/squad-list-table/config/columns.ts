export const columns = [
  {
    id: 'number',
    numeric: false,
    label: '',
    width: 20,
  },
  {
    id: 'position',
    label: '',
    width: 30,
  },
  {
    id: 'nationality',
    label: '',
    width: 20,
  },
  {
    id: 'image',
    numeric: false,
    label: '',
    width: 28,
  },
  {
    id: 'name',
    numeric: false,
    label: '',
    border: true,
  },
  {
    id: 'apps',
    numeric: true,
    label: 'Pl',
    width: 30,
  },
  {
    id: 'goals',
    numeric: true,
    label: 'Gs',
    width: 30,
  },
  {
    id: 'assists',
    numeric: true,
    label: 'As',
    width: 30,
  },
] as const;
