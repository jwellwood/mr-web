import { fireEvent, render, screen } from '@testing-library/react';
import AlertMessage from '../AlertMessage';
import ReduxWrapper from "../../../../utils/test-helpers/ReduxWrapper.tsx";
import {showAlert} from "../../../../store/features/alerts/alertsSlice.ts";

jest.mock("../../../../store/features/alerts/alertsSlice.ts", () => ({
  showAlert: jest.fn(),
}));

const setupStore = (text: string, type: string) => ({
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
    render(
      <ReduxWrapper storeData={mockStore}>
        <AlertMessage />
      </ReduxWrapper>
    );
    fireEvent.click(await screen.findByLabelText('Close'));
    expect(showAlert).toHaveBeenCalled();
  });
});
