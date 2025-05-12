import React from 'react';
import TablePagination from '@mui/material/TablePagination';

type Props = {
  page: number;
  setPage: (pageNumber: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  rows: object[];
};

const Pagination: React.FC<Props> = ({ page, setPage, rowsPerPage, setRowsPerPage, rows }) => {
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
