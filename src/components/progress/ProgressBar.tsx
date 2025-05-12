import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { CustomTypography } from '../typography';

interface Props {
  progress: number;
}

const PREFIX = 'ProgressBar';
const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`,
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    width: '100%',
  },
});

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${classes.bar}`]: {
    height: '10px',
    borderRadius: theme.spacing(3),
  },
}));

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <StyledLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <CustomTypography
          bold
          size="xs"
          color={props.value < 100 ? 'warning' : 'success'}
        >{`${Math.round(props.value)}%`}</CustomTypography>
      </Box>
    </Box>
  );
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <Root className={classes.root}>
      <LinearProgressWithLabel value={progress} className={classes.bar} />
    </Root>
  );
};

export default ProgressBar;
