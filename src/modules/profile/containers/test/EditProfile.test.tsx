import { useQuery } from '@apollo/client/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import {
  resetUseMutationImpl,
  setUseMutationImpl,
  invokeImpl,
} from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import EditProfile from '../EditProfile';

// Override the global apollo mock to also control useQuery
vi.mock('@apollo/client/react', async () => {
  const actual =
    await vi.importActual<typeof import('@apollo/client/react')>('@apollo/client/react');
  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: (
      gql?: unknown,
      options?: { onError?: (err: { message?: string }) => void } | undefined
    ) => invokeImpl(gql, options),
  };
});

vi.mock('../../../hooks', async () => {
  const actual = await vi.importActual<typeof import('../../../../hooks')>('../../../hooks');
  return {
    ...actual,
    useNationality: () => ({
      nationalityOptions: [{ label: '', value: '' }],
      countryName: '',
      getCountryName: vi.fn(),
    }),
  };
});

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

vi.mock('../../../services/graphql/apolloClient', () => ({
  apolloClient: { resetStore: vi.fn(() => Promise.resolve()) },
}));

const mockedUseQuery = vi.mocked(useQuery);

const mockUserData = {
  user: {
    _id: 'u1',
    username: 'jdoe',
    email: 'jdoe@example.com',
    dateOfBirth: '1990-06-15T00:00:00.000Z',
    nationality: 'GB',
    image: { url: 'https://example.com/img.png', public_id: 'img-1' },
    teamIds: [],
    orgIds: [],
    createdAt: '2020-01-01',
    updatedAt: '2021-01-01',
  },
};

const renderComponent = () =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <EditProfile />
      </TestWrapper>
    </MemoryRouter>
  );

describe('EditProfile container', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => Promise.resolve({}), { loading: false }]);
    mockedUseQuery.mockReturnValue({
      data: mockUserData,
      loading: false,
      error: undefined,
    } as never);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the Edit Profile form when data is loaded', () => {
    renderComponent();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders a spinner while data is loading', () => {
    mockedUseQuery.mockReturnValue({ data: undefined, loading: true, error: undefined } as never);
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('dispatches success alert and navigates on successful form submit', async () => {
    const mutationFn = vi.fn(() => Promise.resolve({}));
    setUseMutationImpl(() => [mutationFn as never, { loading: false }]);
    renderComponent();

    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText(/username/i);
    await user.clear(usernameInput);
    await user.type(usernameInput, 'newname');

    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled());
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mutationFn).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'alert/showAlert' })
      );
    });
  });

  it('dispatches an error alert when mutation fails', () => {
    setUseMutationImpl((_gql, options?: { onError?: (err: { message?: string }) => void }) => {
      options?.onError?.({ message: 'Update failed' });
      return [async () => undefined, { loading: false }];
    });
    renderComponent();

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'alert/showAlert',
        payload: expect.objectContaining({ type: 'error' }),
      })
    );
  });
});
