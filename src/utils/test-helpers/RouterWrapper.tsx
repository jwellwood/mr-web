import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  children: ReactElement;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderWithRouter = (ui: any, { route = '/' } = {}) => {
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
