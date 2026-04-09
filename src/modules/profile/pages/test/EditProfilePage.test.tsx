import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import type { EditProfileFormData } from '../../forms/edit-profile/schema';
import EditProfilePage from '../../pages/EditProfilePage';

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

const { mockDispatch } = vi.hoisted(() => ({ mockDispatch: vi.fn() }));
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return { ...actual, useDispatch: () => mockDispatch };
});

const defaultValues: EditProfileFormData = {
  username: 'jdoe',
  email: 'jdoe@example.com',
  dateOfBirth: new Date('1990-06-15'),
  nationality: 'GB',
};

describe('EditProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => undefined, { loading: false }]);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the Edit Profile page title', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfilePage onSubmit={vi.fn()} defaultValues={defaultValues} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  it('renders the edit profile form fields', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfilePage onSubmit={vi.fn()} defaultValues={defaultValues} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders a spinner when defaultValues is null', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfilePage onSubmit={vi.fn()} defaultValues={null} loading={true} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders the delete account modal trigger when defaultValues are present', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfilePage onSubmit={vi.fn()} defaultValues={defaultValues} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByTestId('delete-modal-trigger')).toBeInTheDocument();
  });
});
