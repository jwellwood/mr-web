import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/system';
import { CustomTypography } from '../typography';
import { shortenString } from 'utils/helpers';

interface Props {
  id: string;
  children: string;
}

const NameCell: React.FC<Props> = ({ id, children }) => {
  return (
    <Box
      sx={{ textDecoration: 'none', paddingLeft: '4px', display: 'flex' }}
      component={RouterLink}
      to={`player/${id}`}
    >
      <CustomTypography bold color="data">
        {shortenString(children, 15)}
      </CustomTypography>
    </Box>
  );
};

export default NameCell;
