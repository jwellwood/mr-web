import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const PREFIX = 'Spinner';
const classes = {
  root: `${PREFIX}-root`,
  circle: `${PREFIX}-circle`,
  icon: `${PREFIX}-icon`,
};

const Circle = styled('div')({
  [`&.${classes.circle}`]: {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

interface Props {
  isSecondary?: boolean;
}

const Spinner: React.FC<Props> = () => {
  return (
    <Circle className={classes.circle}>
      <CircularProgress color="primary" />
    </Circle>
  );
};

export default Spinner;
