import { Box } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { shortenString } from '../../../utils';
import CustomSkeleton from '../../loaders/CustomSkeleton';
import { CustomTypography } from '../../typography';

interface Props {
  id: string;
  children: string;
  loading?: boolean;
}

export default function NameCell({ id, children, loading }: Props) {
  return (
    <Box
      sx={{ textDecoration: 'none', paddingLeft: '4px', display: 'flex' }}
      component={RouterLink}
      to={`player/${id}`}
    >
      {loading ? (
        <CustomSkeleton width="100px" />
      ) : (
        <CustomTypography bold color="data">
          {shortenString(children, 18)}
        </CustomTypography>
      )}
    </Box>
  );
}
