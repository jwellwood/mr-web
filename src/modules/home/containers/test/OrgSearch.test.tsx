import { MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { FETCH_ORGS_BY_SEARCH } from '../../graphql/FETCH_ORGS_BY_SEARCH';
import OrgSearch from '../OrgSearch';

const renderOrgSearch = (mocks: readonly MockLink.MockedResponse[]) =>
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <TestWrapper>
          <OrgSearch buttonElement={<div>Search Organizations</div>} />
        </TestWrapper>
      </MockedProvider>
    </MemoryRouter>
  );

describe('OrgSearch', () => {
  const mocks = [
    {
      request: {
        query: FETCH_ORGS_BY_SEARCH,
        variables: { filter: 'test' },
      },
      result: {
        data: {
          orgs: [
            {
              _id: '1',
              name: 'Org 1',
              city: 'City 1',
              country: 'Country 1',
              badge: { url: 'url1', public_id: 'id1' },
            },
            {
              _id: '2',
              name: 'Org 2',
              city: 'City 2',
              country: 'Country 2',
              badge: { url: 'url2', public_id: 'id2' },
            },
          ],
        },
      },
    },
  ];

  it('renders the search input and submits a query', async () => {
    const user = userEvent.setup();
    renderOrgSearch(mocks);

    await user.click(screen.getByRole('button', { name: /search organizations/i }));

    const input = screen.getByLabelText('League name');
    await user.type(input, 'test');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(await screen.findByText('Org 1')).toBeInTheDocument();
    expect(await screen.findByText('Org 2')).toBeInTheDocument();
  });

  it('renders no results message when no organizations are found', async () => {
    const noResultsMock = [
      {
        request: {
          query: FETCH_ORGS_BY_SEARCH,
          variables: { filter: 'noresults' },
        },
        result: {
          data: { orgs: [] },
        },
      },
    ];

    const user = userEvent.setup();
    renderOrgSearch(noResultsMock);

    await user.click(screen.getByRole('button', { name: /search organizations/i }));

    const input = screen.getByLabelText('League name');
    await user.type(input, 'noresults');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(await screen.findByText('No league found')).toBeInTheDocument();
  });
});
