import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

// eslint-disable-next-line react-refresh/only-export-components
export const renderWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
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
