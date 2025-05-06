import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  children: ReactElement;
}

export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

const RouterWrapper: React.FC<Props> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterWrapper;

// test utils file
