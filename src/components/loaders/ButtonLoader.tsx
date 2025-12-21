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

export default function ButtonLoader() {
  return (
    <Circle className={classes.circle}>
      <CircularProgress size="20px" color="warning" />
    </Circle>
  );
}
