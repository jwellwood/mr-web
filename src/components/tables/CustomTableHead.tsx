import {MouseEvent} from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { CustomTypography } from '../typography';
import { theme } from '../../theme';

interface Data {
  apps: string;
  goals: number;
  assists: number;
  position: string;
  isPercentage?: boolean;
}

interface Props {
  onRequestSort: (
    event: MouseEvent,
    property: keyof Data
  ) => void;
  columns: {
    id: keyof Data,
    label: string,
    width: string
  }[];
  sortBy?: string;
  isSortable: boolean;
}

function CustomTableHead({
  columns,
  onRequestSort,
  sortBy,
  isSortable,
}: Props) {
  const createSortHandler =
    (property: keyof Data) => (event: MouseEvent) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ background: theme.palette.dark.main }}>
      <TableRow>
        {columns.map((headCell) => {
          const renderSort = sortBy === headCell.id && sortBy !== 'position';
          const stringCell = () =>
            typeof headCell.label === 'string' && headCell.label !== '' ? (
              <CustomTypography
                bold
                color={renderSort ? 'secondary' : 'label'}
                size="xs"
              >
                {headCell.label}
              </CustomTypography>
            ) : (
              headCell.label
            );
          return (
            <TableCell
              key={headCell.id}
              align="center"
              sx={{
                padding: '4px',
                minWidth: headCell.width,
                lineHeight: '0',
                background: renderSort
                  ? theme.palette.primary.main
                  : theme.palette.secondary.dark,
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
};

export default CustomTableHead;
