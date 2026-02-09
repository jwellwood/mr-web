import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { MouseEvent, ReactNode } from 'react';
import { theme } from '../../../theme';
import { CustomTypography } from '../../typography';

type Props<T extends Record<string, string | number | object | ReactNode>> = {
  onRequestSort: (event: MouseEvent, property: keyof T) => void;
  columns: {
    id: keyof T;
    label?: ReactNode;
    width?: number;
  }[];
  sortBy?: string;
  isSortable: boolean;
};

export default function CustomTableHead<
  T extends Record<string, string | number | object | ReactNode>,
>({ columns, onRequestSort, sortBy, isSortable }: Props<T>) {
  const createSortHandler = (property: keyof T) => (event: MouseEvent) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ background: theme.palette.dark.main }}>
      <TableRow>
        {columns.map(headCell => {
          const renderSort = sortBy === headCell.id && sortBy !== 'position';

          const hasHeaderLabel = columns.some(
            column => typeof column.label === 'string' && column.label !== ''
          );
          const stringCell = () =>
            typeof headCell.label === 'string' && headCell.label !== '' ? (
              <CustomTypography bold color={renderSort ? 'secondary' : 'label'} size="xs">
                {headCell.label}
              </CustomTypography>
            ) : (
              headCell.label
            );
          return (
            <TableCell
              key={headCell.id as string}
              align="center"
              sx={{
                padding: '0px 4px',
                width: headCell.width,
                minWidth: headCell.width,
                lineHeight: '0',
                background: renderSort ? theme.palette.primary.main : theme.palette.secondary.dark,
                borderBottom: hasHeaderLabel ? '1px solid white' : 'none',
              }}
              sortDirection={renderSort ? 'desc' : false}
            >
              {isSortable ? (
                <TableSortLabel
                  active={renderSort}
                  direction="desc"
                  onClick={createSortHandler(headCell.id)}
                  sx={{
                    '& .MuiTableSortLabel-icon': {
                      display: 'none !important',
                    },
                  }}
                >
                  {stringCell()}
                </TableSortLabel>
              ) : (
                stringCell()
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
