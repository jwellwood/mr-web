import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { useState, MouseEvent, useMemo } from 'react';
import CustomTableBody from '../custom-table-body/CustomTableBody';
import CustomTableHead from '../custom-table-head/CustomTableHead';
import { getComparator, stableSort } from '../helpers/sort';
import type { ColumnConfig, CellValue } from '../types';

type Props<T extends Record<string, CellValue>> = {
  rows: readonly T[];
  columns: readonly ColumnConfig<T>[];
  isSortable: boolean;
  sortByString?: string;
  loading?: boolean;
  loadingRowCount: number;
  onSortChange?: (sortBy: string) => void;
  rowStyles?:
    | ((index: number, row: T) => React.CSSProperties | undefined)
    | Record<number, React.CSSProperties>;
};

export default function CustomTable<T extends Record<string, CellValue>>({
  rows = [],
  columns,
  isSortable,
  sortByString = '',
  loading,
  loadingRowCount = 10,
  onSortChange,
  rowStyles,
}: Props<T>) {
  const [sortBy, setSortBy] = useState(sortByString);

  const handleRequestSort = (_: MouseEvent, property: keyof T) => {
    const key = String(property);
    setSortBy(key);
    onSortChange?.(key);
  };

  const visibleRows = useMemo(
    () => (onSortChange ? rows : stableSort(rows, getComparator('desc', sortBy))),
    [sortBy, rows, onSortChange]
  );

  const hasLabel = columns.some(col => col.label);

  const columnMap = useMemo(() => {
    const map = new Map<string, ColumnConfig<T>>();
    columns.forEach(col => map.set(String(col.id), col));
    return map;
  }, [columns]);

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader aria-labelledby="tableTitle" size="small">
          {hasLabel && (
            <CustomTableHead
              onRequestSort={handleRequestSort}
              columns={columns}
              sortBy={sortBy}
              isSortable={isSortable}
            />
          )}
          <CustomTableBody
            rows={visibleRows}
            columnMap={columnMap}
            sortBy={sortBy}
            loading={loading}
            loadingRowCount={loadingRowCount}
            rowStyles={rowStyles}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
