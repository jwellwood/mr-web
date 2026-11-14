import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import RenderEntityList from '../RenderEntityList';

describe('RenderEntityList', () => {
  it('renders result details and passes the selected entity to the callback', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const entity = { id: 'team1', name: 'Rovers', city: 'London' };
    render(
      <TestWrapper>
        <RenderEntityList
          type="team"
          searchTerm="Rovers"
          searchLoading={false}
          results={[entity]}
          onClick={onClick}
        />
      </TestWrapper>
    );

    expect(screen.getByText('London')).toBeInTheDocument();
    await user.click(screen.getByText('Rovers'));
    expect(onClick).toHaveBeenCalledWith(entity);
  });

  it.each([
    { type: 'team' as const, message: 'No teams found' },
    { type: 'org' as const, message: 'No organizations found' },
  ])('shows the empty message for $type searches', ({ type, message }) => {
    render(
      <TestWrapper>
        <RenderEntityList type={type} searchTerm="Rovers" searchLoading={false} results={[]} />
      </TestWrapper>
    );

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it.each([
    { searchTerm: '  ', searchLoading: false, results: [] },
    { searchTerm: 'Rovers', searchLoading: true, results: [] },
    { searchTerm: 'Rovers', searchLoading: false, results: undefined },
  ])('does not display an empty message before results are ready', props => {
    render(
      <TestWrapper>
        <RenderEntityList type="team" {...props} />
      </TestWrapper>
    );

    expect(screen.queryByText('No teams found')).not.toBeInTheDocument();
  });
});
