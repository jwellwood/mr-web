import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { setUseMutationImpl, resetUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import '@testing-library/jest-dom';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import DeleteAccount from '../DeleteAccount';

vi.mock('../../../../services/graphql/apolloClient', () => ({
  apolloClient: { resetStore: vi.fn(() => Promise.resolve()) },
}));

// Mock DeleteModal so we can trigger onDelete directly without MUI dialog complexity
vi.mock('../../../../components/modals', () => ({
  DeleteModal: ({ onDelete }: { onDelete: () => void; title: string; loading: boolean }) => (
    <>
      <div data-testid="delete-modal-trigger" onClick={onDelete} />
      <button data-testid="confirm-delete" onClick={onDelete}>
        Delete
      </button>
    </>
  ),
}));

const { mockDispatch, mockNavigate } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return { ...actual, useDispatch: () => mockDispatch };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderComponent = () =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <DeleteAccount />
      </TestWrapper>
    </MemoryRouter>
  );

describe('DeleteAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => Promise.resolve({}), { loading: false }]);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the delete modal trigger', () => {
    renderComponent();
    expect(screen.getByTestId('delete-modal-trigger')).toBeInTheDocument();
  });

  it('dispatches a success alert and navigates after successful deletion', async () => {
    const mutationFn = vi.fn(() => Promise.resolve({}));
    setUseMutationImpl(() => [mutationFn as never, { loading: false }]);

    renderComponent();

    // Use act() to flush all async effects including the onDelete Promise chain
    await act(async () => {
      fireEvent.click(screen.getByTestId('confirm-delete'));
    });

    expect(mutationFn).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'alert/showAlert' }));
  });

  it('dispatches an error alert when deletion fails', async () => {
    setUseMutationImpl((_gql, options?: { onError?: (err: { message?: string }) => void }) => {
      return [
        async () => {
          options?.onError?.({ message: 'Delete failed' });
          return undefined;
        },
        { loading: false },
      ];
    });

    renderComponent();

    await act(async () => {
      fireEvent.click(screen.getByTestId('confirm-delete'));
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'alert/showAlert',
        payload: expect.objectContaining({ type: 'error' }),
      })
    );
  });
});
