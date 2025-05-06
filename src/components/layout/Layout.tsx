import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HOME, PROFILE } from '../../router/paths';
import { styled } from '@mui/material/styles';

const PREFIX = 'Layout';
const classes = {
  root: `${PREFIX}-root`,
  nav: `${PREFIX}-nav`,
  content: `${PREFIX}-content`,
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  [`& .${classes.nav}`]: {
    display: 'flex',
    padding: '1rem',
    backgroundColor: '#333',
    color: 'white',
  },
  [`& .${classes.content}`]: {
    flex: 1,
    padding: '1rem',
  },
});

const NavLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  marginRight: '1rem',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Layout: React.FC = () => {
  return (
    <Root className={classes.root}>
      <nav className={classes.nav}>
        <NavLink to={HOME}>Home</NavLink>
        <NavLink to={PROFILE}>Profile</NavLink>
      </nav>
      <main className={classes.content}>
        <Outlet />
      </main>
    </Root>
  );
};

export default Layout;