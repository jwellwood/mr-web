import React from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const PREFIX = 'PageContainer';
const classes = {
  offset: `${PREFIX}-offset`,
  container: `${PREFIX}-container`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.container}`]: {
    background: theme.palette.dark.main,
    minHeight: '100vh',
  },
  [`.${classes.offset}`]: theme.mixins.toolbar,
}));

interface Props {
  children: React.ReactNode;
  admin?: boolean;
}

const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <StyledContainer
      className={classes.container}
      sx={{ padding: '2px 2px 0px 2px' }}
    >
      <div>{children}</div>
    </StyledContainer>
  );
};

export default PageContainer;
