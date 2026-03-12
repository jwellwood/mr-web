import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { describe, it, expect } from 'vitest';
import type { RootState } from '../../../store';
import CustomSnackbar from '../custom-snackbar/CustomSnackbar';

const mockStore = configureStore<Partial<RootState>>([]);

describe('CustomSnackbar', () => {
  it('renders snackbar with alert text when store has an alert', () => {
    const store = mockStore({
      alertsReducer: { text: 'Saved successfully!', type: 'success' },
    } as RootState);

    render(
      <Provider store={store}>
        <CustomSnackbar />
      </Provider>
    );

    expect(screen.getByText('Saved successfully!')).toBeInTheDocument();
  });

  it('renders nothing when alert text is empty', () => {
    const store = mockStore({
      alertsReducer: { text: '', type: 'success' },
    } as RootState);

    const { container } = render(
      <Provider store={store}>
        <CustomSnackbar />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders error-type alerts', () => {
    const store = mockStore({
      alertsReducer: { text: 'Something went wrong', type: 'error' },
    } as RootState);

    render(
      <Provider store={store}>
        <CustomSnackbar />
      </Provider>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('dispatches clearAlert when close button clicked', () => {
    const store = mockStore({
      alertsReducer: { text: 'Closeable alert', type: 'info' },
    } as RootState);

    render(
      <Provider store={store}>
        <CustomSnackbar />
      </Provider>
    );

    const closeButton = screen.getByTitle('Close');
    fireEvent.click(closeButton);

    const actions = store.getActions();
    expect(actions.some(a => a.type.includes('clearAlert') || a.type.includes('alerts'))).toBe(
      true
    );
  });
});
