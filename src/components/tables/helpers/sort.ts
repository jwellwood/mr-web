import { ReactNode } from 'react';

export type SortOrder = 'asc' | 'desc';

export const POSITION_ORDER = {
  GK: 3,
  DF: 2,
  MF: 1,
  FW: 0,
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (orderBy === 'position') {
    if (
      POSITION_ORDER[b[orderBy] as keyof typeof POSITION_ORDER] <
      POSITION_ORDER[a[orderBy] as keyof typeof POSITION_ORDER]
    ) {
      return -1;
    }
    if (
      POSITION_ORDER[b[orderBy] as keyof typeof POSITION_ORDER] >
      POSITION_ORDER[a[orderBy] as keyof typeof POSITION_ORDER]
    ) {
      return 1;
    }
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(
  order: SortOrder,
  orderBy: string
): (
  a: Record<string, number | object | ReactNode>,
  b: Record<string, number | object | ReactNode>
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
