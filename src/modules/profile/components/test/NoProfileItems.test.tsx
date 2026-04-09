import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import NoProfileItems from '../NoProfileItems';

vi.mock('../../../home/containers/TeamSearch', () => ({
  default: ({ buttonElement }: { buttonElement: React.ReactNode }) => (
    <div data-testid="team-search">{buttonElement}</div>
  ),
}));

vi.mock('../../../organization/router', () => ({
  ORG_PATHS: { ADD: '/org/add' },
}));

describe('NoProfileItems', () => {
  it('renders the no-teams title for type "team"', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <NoProfileItems type="team" />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('No teams found')).toBeInTheDocument();
  });

  it('renders the TeamSearch component for type "team"', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <NoProfileItems type="team" />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByTestId('team-search')).toBeInTheDocument();
  });

  it('renders the no-organizations title for type "organization"', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <NoProfileItems type="organization" />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('No organizations found')).toBeInTheDocument();
  });

  it('renders the create organization link for type "organization"', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <NoProfileItems type="organization" />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /create an organization/i })).toBeInTheDocument();
  });

  it('does not render TeamSearch for type "organization"', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <NoProfileItems type="organization" />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.queryByTestId('team-search')).not.toBeInTheDocument();
  });

  it('does not render the create org link for type "team"', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <NoProfileItems type="team" />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.queryByRole('link', { name: /create an organization/i })).not.toBeInTheDocument();
  });
});
