export const columns = [
  {
    id: 'position',
    label: '',
    width: 24,
  },
  {
    id: 'nationality',
    label: '',
    width: 30,
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
  },
  {
    id: 'joined',
    numeric: true,
    label: 'From',
    width: 40,
  },
  {
    id: 'left',
    numeric: true,
    label: 'To',
    width: 40,
  },
  {
    id: 'seasons',
    numeric: true,
    label: 'Seas',
    width: 20,
  },
] as const;
