import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppIcon from '../icons/AppIcon';
import { IIconType } from '../icons/types';
import { theme } from '../../theme';

const PREFIX = 'CustomIconButton';
const classes = {
  button: `${PREFIX}-button`,
};

const StyledButton = styled(Button)(({ theme }) => ({
  [`&.${classes.button}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 0,
  },
}));

interface Props {
  icon: IIconType;
  size?: string;
  color?: string;
  onClick: () => void;
}

const CustomIconButton: React.FC<Props> = ({
  icon,
  size = '1rem',
  color = theme.palette.common.white,
  onClick,
}) => {
  return (
    <StyledButton onClick={onClick} className={classes.button}>
      <AppIcon icon={icon} size={size} color={color} />
    </StyledButton>
  );
};

export default CustomIconButton;
