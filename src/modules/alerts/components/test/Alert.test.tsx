import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as Actions from 'modules/alerts/actions/app.actions';
import ReduxWrapper from 'utils/test-helpers/ReduxWrapper';
import AlertMessage from '../AlertMessage';

const setupStore = (text, type) => ({
  alert: { text, type },
});

describe('AlertMessage tests', () => {
  it('renders an alert message', () => {
    const mockStore = setupStore('Message', 'error');
    render(
      <ReduxWrapper storeData={mockStore}>
        <AlertMessage />
      </ReduxWrapper>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
  it('does not render an alert when no message', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    const mockStore = setupStore('', '');
    render(
      <ReduxWrapper storeData={mockStore}>
        <AlertMessage />
      </ReduxWrapper>
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    jest.spyOn(console, 'error').mockRestore();
  });
  it('does not render if nothing in store', () => {
    render(
      <ReduxWrapper storeData={{}}>
        <AlertMessage />
      </ReduxWrapper>
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
  it('closes on close button', async () => {
    jest.useFakeTimers();
    const mockStore = setupStore('Message', 'success');
    const mockShowAlert = jest.spyOn(Actions, 'showAlert');
    render(
      <ReduxWrapper storeData={mockStore}>
        <AlertMessage />
      </ReduxWrapper>
    );
    fireEvent.click(await screen.findByLabelText('Close'));
    expect(mockShowAlert).toHaveBeenCalled();
  });
});
