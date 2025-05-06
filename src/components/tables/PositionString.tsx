import React, { ReactElement } from 'react';
import { amber, blue, green, red } from '@mui/material/colors';
import { CustomTypography } from '../typography';
import { POSITIONS } from 'modules/players/constants';

type Props = {
  children: string | number | ReactElement;
};

const PositionString: React.FC<Props> = ({ children }) => {
  let color = 'data';
  switch (children) {
    case 4:
    case 'GK':
      color = amber[500];
      break;
    case 3:
    case 'DF':
      color = blue[500];
      break;
    case 2:
    case 'MF':
      color = green[400];
      break;
    case 1:
    case 'FW':
      color = red[700];
      break;
    default:
      break;
  }
  return (
    <CustomTypography bold size="xs" color={color}>
      {typeof children === 'number' ? POSITIONS[children] : children}
    </CustomTypography>
  );
};

export default PositionString;
