import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { FETCH_ORGS_BY_SEARCH } from '../../../home/graphql/FETCH_ORGS_BY_SEARCH';
import RequestOrgAdmin from '../RequestOrgAdmin';

const updateAuth = vi.fn();

vi.mock('../../../../hooks', async importOriginal => ({
  ...(await importOriginal<typeof import('../../../../hooks')>()),
  useUpdateAuth: () => ({ updateAuth }),
}));

const searchMocks = [
  {
    request: { query: FETCH_ORGS_BY_SEARCH, variables: { filter: 'test' } },
    result: {
      data: {
        orgs: [
          {
            _id: 'org1',
            name: 'Org 1',
            city: 'City 1',
            country: 'Country 1',
            badge: { url: 'url1', public_id: 'id1' },
          },
        ],
      },
    },
  },
];

describe('RequestOrgAdmin', () => {
  afterEach(() => {
    resetUseMutationImpl();
    vi.clearAllMocks();
  });

  it('searches, selects an org, submits the code and closes the modal', async () => {
    const mutate = vi.fn(async () => ({
      data: { REQUEST_ORG_ADMIN_ACCESS: { token: 'new-token' } },
    }));
    setUseMutationImpl(() => [mutate, { loading: false }]);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <MockedProvider mocks={searchMocks}>
          <TestWrapper>
            <RequestOrgAdmin />
          </TestWrapper>
        </MockedProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button'));
    await user.type(screen.getByLabelText('League name'), 'test');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    await user.click(await screen.findByText('Org 1'));

    await user.type(await screen.findByLabelText(/access code/i), 'secret1');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(updateAuth).toHaveBeenCalledWith('new-token'));
    expect(mutate).toHaveBeenCalledWith({ variables: { orgId: 'org1', code: 'secret1' } });
    await waitFor(() => expect(screen.queryByLabelText(/access code/i)).not.toBeInTheDocument(), {
      timeout: 3000,
    });
  });
});
