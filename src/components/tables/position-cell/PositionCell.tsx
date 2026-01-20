import { ReactElement } from 'react';
import { amber, blue, green, red } from '@mui/material/colors';
import { CustomTypography } from '../../typography';
import { POSITIONS } from '../../../constants';

interface Props {
  children: string | number | ReactElement;
  size?: string;
}

export default function PositionCell({ children, size = 'xs' }: Props) {
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
    <CustomTypography bold size={size} color={color}>
      {typeof children === 'string' && (children as keyof typeof POSITIONS) in POSITIONS
        ? POSITIONS[children as keyof typeof POSITIONS]
        : children}
    </CustomTypography>
  );
}
