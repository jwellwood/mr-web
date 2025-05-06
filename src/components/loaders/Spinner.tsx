import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { CustomTypography } from '../typography';

const PREFIX = 'Spinner';
const classes = {
  root: `${PREFIX}-root`,
  circle: `${PREFIX}-circle`,
  icon: `${PREFIX}-icon`,
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto',
  },
});

const Circle = styled('div')({
  [`&.${classes.circle}`]: {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  [`&.${classes.icon}`]: {
    color: theme.palette.secondary.main,
  },
}));

interface Props {
  isSecondary?: boolean;
}

const Spinner: React.FC<Props> = ({ isSecondary = false }) => {
  const spinner = isSecondary ? (
    <Circle className={classes.circle}>
      <CircularProgress color="secondary" />
    </Circle>
  ) : (
    <Root className={classes.root}>
      <StyledCircularProgress className={classes.icon} />
      <CustomTypography size="xs" color="label">
        loading...
      </CustomTypography>
    </Root>
  );
  return spinner;
};

export default Spinner;
