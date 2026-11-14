import { Pagination } from '@mui/material';
import { SectionContainer } from '../..';
import { theme } from '../../../theme';
import { CustomStack } from '../../grids';

interface Props {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({ totalPages, page, onPageChange }: Props) {
  return (
    <SectionContainer>
      <CustomStack align="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              color: theme.palette.label.main,
              borderColor: theme.palette.label.main,
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
            },
          }}
        />
      </CustomStack>
    </SectionContainer>
  );
}
