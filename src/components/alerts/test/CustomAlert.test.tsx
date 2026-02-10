import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { describe, it, expect } from 'vitest';
import type { RootState } from '../../../store';
import CustomAlert from '../custom-alert/CustomAlert';

const mockStore = configureStore<RootState>([]);

describe('CustomAlert', () => {
  it('renders alert text when store has an alert', () => {
    const store = mockStore({
      alertsReducer: {
        text: 'Test alert',
        type: 'success',
      },
    } as RootState);

    render(
      <Provider store={store}>
        <CustomAlert />
      </Provider>
    );

    expect(screen.getByText('Test alert')).toBeInTheDocument();
  });

  it('does not render when there is no alert text', () => {
    const store = mockStore({
      alertsReducer: {
        text: '',
        type: 'warning',
      },
    } as RootState);

    render(
      <Provider store={store}>
        <CustomAlert />
      </Provider>
    );

    // Should not find any alert text
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
