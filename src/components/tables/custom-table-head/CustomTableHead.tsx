import { TableHead, TableRow } from '@mui/material';
import { MouseEvent, ReactNode } from 'react';
import { theme } from '../../../theme';
import type { ColumnConfig } from '../types';
import CustomHeadLabel from './CustomHeadLabel';

type Props<T extends Record<string, string | number | object | ReactNode>> = {
  onRequestSort: (event: MouseEvent, property: keyof T) => void;
  columns: readonly ColumnConfig<T>[];
  sortBy?: string;
  isSortable: boolean;
};

export default function CustomTableHead<
  T extends Record<string, string | number | object | ReactNode>,
>({ columns, onRequestSort, sortBy, isSortable }: Props<T>) {
  const createSortHandler = (property: keyof T) => (event: MouseEvent) => {
    onRequestSort(event, property);
  };

  const hasHeaderLabel = columns.some(
    column => typeof column.label === 'string' && column.label !== ''
  );

  return (
    <TableHead sx={{ background: theme.palette.dark.main }}>
      <TableRow>
        {columns.map(column => {
          const isActive = sortBy === column.id && sortBy !== 'position';

          return (
            <CustomHeadLabel
              key={column.id as string}
              column={column}
              isActive={isActive}
              hasHeaderLabel={hasHeaderLabel}
              isSortable={isSortable}
              createSortHandler={createSortHandler}
            />
          );
        })}
      </TableRow>
    </TableHead>
  );
}
