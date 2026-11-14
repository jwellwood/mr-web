import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import FindEntity from '../FindEntity';

describe('FindEntity', () => {
  it('submits the search and selects a result', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    const setSelected = vi.fn();
    const entity = { id: 'org1', name: 'League One', city: 'London' };
    render(
      <TestWrapper>
        <FindEntity
          type="org"
          searchTerm="League"
          searchLoading={false}
          results={[entity]}
          handleSearch={handleSearch}
          setSelected={setSelected}
        />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /^search$/i }));
    expect(handleSearch).toHaveBeenCalledOnce();
    expect(handleSearch.mock.calls[0][0]).toEqual({ teamName: 'League' });
    await user.click(screen.getByText('League One'));
    expect(setSelected).toHaveBeenCalledWith(entity);
  });

  it('displays a search error and hides results while loading', () => {
    render(
      <TestWrapper>
        <FindEntity
          type="team"
          searchTerm="Rovers"
          searchLoading
          error={{ message: 'Search failed' }}
          results={[{ id: 'team1', name: 'Rovers' }]}
          handleSearch={vi.fn()}
          setSelected={vi.fn()}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Search failed')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Rovers')).not.toBeInTheDocument();
  });
});
