import { TableCell, TableSortLabel } from '@mui/material';
import { ReactNode, MouseEvent } from 'react';
import { theme } from '../../../theme';
import { CustomTypography } from '../../typography';
import { ColumnConfig } from '../types';

interface Props<T extends Record<string, string | number | object | ReactNode>> {
  column: ColumnConfig<T>;
  isActive: boolean;
  hasHeaderLabel: boolean;
  isSortable: boolean;
  createSortHandler: (property: keyof T) => (event: MouseEvent) => void;
}

export default function CustomHeadLabel<
  T extends Record<string, string | number | object | ReactNode>,
>({ column, isActive, hasHeaderLabel, isSortable, createSortHandler }: Props<T>) {
  const renderCellLabel = (label: ReactNode, isActive: boolean) => {
    const isString = typeof label === 'string' && label !== '';

    if (!isString) {
      return label;
    }

    return (
      <CustomTypography bold color={isActive ? 'secondary' : 'label'} size="xs">
        {label}
      </CustomTypography>
    );
  };

  return (
    <TableCell
      key={column.id as string}
      align="center"
      sx={{
        padding: '0px 4px',
        width: column.styles?.width,
        minWidth: column.styles?.width,
        lineHeight: '0',
        background: isActive ? theme.palette.primary.main : theme.palette.secondary.dark,
        borderBottom: hasHeaderLabel ? '1px solid white' : 'none',
      }}
      sortDirection={isActive ? 'desc' : false}
    >
      {isSortable ? (
        <TableSortLabel
          active={isActive}
          direction="desc"
          onClick={createSortHandler(column.id)}
          sx={{
            '& .MuiTableSortLabel-icon': {
              display: 'none !important',
            },
          }}
        >
          {renderCellLabel(column.label, isActive)}
        </TableSortLabel>
      ) : (
        renderCellLabel(column.label, isActive)
      )}
    </TableCell>
  );
}
