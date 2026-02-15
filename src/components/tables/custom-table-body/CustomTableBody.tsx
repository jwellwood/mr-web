import { TableBody, TableCell, TableRow } from '@mui/material';
import { useMemo } from 'react';
import CustomTableCell from '../custom-table-cell/CustomTableCell';
import { getCellStyles } from '../helpers/getCellStyles';
import { CellValue, ColumnConfig } from '../types';

interface Props<T extends Record<string, CellValue>> {
  rows: readonly T[];
  columnMap: Map<string, ColumnConfig<T>>;
  sortBy: string;
  loading?: boolean;
  loadingRowCount?: number;
}

export default function CustomTableBody<T extends Record<string, CellValue>>({
  rows,
  columnMap,
  sortBy,
  loading,
  loadingRowCount = 10,
}: Props<T>) {
  // Generate placeholder rows when loading and rows are empty or fewer than expected
  const displayRows = useMemo(() => {
    if (!loading || rows.length >= loadingRowCount) {
      return rows;
    }

    // Create placeholder rows with all column keys
    const columnKeys = Array.from(columnMap.keys());
    const placeholderRow = columnKeys.reduce(
      (acc, key) => {
        acc[key] = '';
        return acc;
      },
      {} as Record<string, CellValue>
    );

    const placeholderCount = Math.max(0, loadingRowCount - rows.length);
    const placeholders = Array(placeholderCount).fill(placeholderRow);

    return [...rows, ...placeholders] as readonly T[];
  }, [loading, rows, loadingRowCount, columnMap]);

  return (
    <TableBody>
      {displayRows.map((row, rowIndex) => (
        <TableRow hover key={rowIndex} sx={{ cursor: 'pointer' }}>
          {Object.entries(row).map(([cellKey, cellValue]) => {
            const column = columnMap.get(cellKey);
            const styles = getCellStyles(
              cellKey,
              sortBy,
              column as ColumnConfig<Record<string, unknown>> | undefined
            );

            const cellType = column?.type;

            return (
              <TableCell
                className="custom-table-cell"
                size="small"
                align={styles.align}
                key={cellKey}
                id={cellKey}
                sx={{
                  position: styles.sticky ? 'sticky' : 'relative',
                  backgroundColor: styles.backgroundColor,
                  zIndex: styles.sticky ? 1 : 0,
                  left: 0,
                  padding: styles.align === 'left' ? '0px 4px' : '0px',
                  height: '32px',
                  borderRight: styles.border,
                  borderBottom: '0.5px solid rgba(244, 244, 244, 0.3)',
                  color: styles.color || 'data',
                }}
              >
                <CustomTableCell
                  cellKey={cellKey}
                  cellValue={cellValue}
                  cellType={cellType}
                  loading={loading}
                  isStatic={Boolean(column?.isStatic)}
                  styles={styles}
                />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
