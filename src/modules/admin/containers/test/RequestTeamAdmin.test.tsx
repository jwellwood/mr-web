import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { FETCH_TEAMS_BY_SEARCH } from '../../../home/graphql/FETCH_TEAMS_BY_SEARCH';
import { REQUEST_TEAM_ADMIN_ACCESS } from '../../graphql';
import RequestTeamAdmin from '../RequestTeamAdmin';

vi.mock('@apollo/client/react', async importOriginal => importOriginal());

const updateAuth = vi.fn();

vi.mock('../../../../hooks', async importOriginal => ({
  ...(await importOriginal<typeof import('../../../../hooks')>()),
  useUpdateAuth: () => ({ updateAuth }),
}));

describe('RequestTeamAdmin GraphQL integration', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('searches, selects a team, submits the code and updates auth', async () => {
    const user = userEvent.setup();
    const mocks = [
      {
        request: { query: FETCH_TEAMS_BY_SEARCH, variables: { filter: 'Rovers' } },
        result: {
          data: {
            teams: [
              {
                _id: 'team1',
                teamName: 'Rovers',
                location: 'London',
                country: 'GB',
                teamBadge: null,
                isActive: true,
                orgId: { _id: 'org1' },
              },
            ],
          },
        },
      },
      {
        request: {
          query: REQUEST_TEAM_ADMIN_ACCESS,
          variables: { teamId: 'team1', code: 'secret1' },
        },
        result: { data: { REQUEST_TEAM_ADMIN_ACCESS: { token: 'team-token' } } },
      },
    ];

    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks}>
          <TestWrapper>
            <RequestTeamAdmin />
          </TestWrapper>
        </MockedProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: 'Team Admin Access' }));
    await user.type(screen.getByLabelText('Team name'), 'Rovers');
    await user.click(screen.getByRole('button', { name: /^search$/i }));
    await user.click(await screen.findByText('Rovers'));
    await user.type(await screen.findByLabelText(/admin access code/i), 'secret1');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(updateAuth).toHaveBeenCalledWith('team-token'));
    await waitFor(() =>
      expect(screen.queryByLabelText(/admin access code/i)).not.toBeInTheDocument()
    );
  });
});
