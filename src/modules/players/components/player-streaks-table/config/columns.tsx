export const columns = [
  {
    id: 'label',
    label: '',
  },
  {
    id: 'current',
    numeric: true,
    label: 'Current',
    width: 30,
  },
  {
    id: 'longest',
    numeric: true,
    label: 'Longest',
    width: 30,
  },
  {
    id: 'start',
    label: 'From',
  },
  {
    id: 'end',
    label: 'To',
  },
] as const;
