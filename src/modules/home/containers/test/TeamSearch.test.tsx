import { MockedProvider, type MockedResponse } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { FETCH_TEAMS_BY_SEARCH } from '../../graphql';
import TeamSearch from '../TeamSearch';

const renderTeamSearch = (mocks: MockedResponse[]) =>
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestWrapper>
          <TeamSearch buttonElement={<div>Search Teams</div>} />
        </TestWrapper>
      </MockedProvider>
    </MemoryRouter>
  );

describe('TeamSearch', () => {
  const teamResult = {
    _id: 'team1',
    teamName: 'Arsenal',
    location: 'London',
    country: 'GB',
    isActive: true,
    teamBadge: { url: 'https://example.com/badge.png', public_id: 'badge1' },
    orgId: { _id: 'org1' },
  };

  const mocks: MockedResponse[] = [
    {
      request: { query: FETCH_TEAMS_BY_SEARCH, variables: { filter: 'Arsenal' } },
      result: { data: { teams: [teamResult] } },
    },
  ];

  it('renders the search input and submits a query', async () => {
    const user = userEvent.setup();
    renderTeamSearch(mocks);

    await user.click(screen.getByRole('button', { name: /search teams/i }));

    const input = screen.getByLabelText('Team name');
    await user.type(input, 'Arsenal');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(await screen.findByText('Arsenal')).toBeInTheDocument();
  });

  it('renders no results message when no teams are found', async () => {
    const noResultsMock: MockedResponse[] = [
      {
        request: { query: FETCH_TEAMS_BY_SEARCH, variables: { filter: 'noresults' } },
        result: { data: { teams: [] } },
      },
    ];

    const user = userEvent.setup();
    renderTeamSearch(noResultsMock);

    await user.click(screen.getByRole('button', { name: /search teams/i }));

    const input = screen.getByLabelText('Team name');
    await user.type(input, 'noresults');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(await screen.findByText('No team found')).toBeInTheDocument();
  });
});
