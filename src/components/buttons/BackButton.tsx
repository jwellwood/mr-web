import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppIcon from '../icons/AppIcon';

const PREFIX = 'BackButton';
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

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <StyledButton onClick={onClick} className={classes.button}>
      <AppIcon icon="back" size="20px" color="white" />
    </StyledButton>
  );
};

export default BackButton;
