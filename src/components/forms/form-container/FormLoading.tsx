import { Box } from '@mui/material';
import CustomSkeleton from '../../loaders/CustomSkeleton';

interface Props {
  height: string;
}

export default function FormLoading({ height }: Props) {
  return (
    <Box>
      <CustomSkeleton height={height} />
    </Box>
  );
}
