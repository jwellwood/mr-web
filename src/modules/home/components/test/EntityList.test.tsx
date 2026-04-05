import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import EntityList, { type Entity } from '../EntityList';

describe('EntityList', () => {
  const mockEntities: Entity[] = [
    { name: 'Org 1', city: 'London', country: 'GB', link: '/org/1', badge: 'url1' },
    { name: 'Org 2', city: 'Madrid', country: 'ES', link: '/org/2', badge: 'url2' },
  ];

  it('renders entities when search is complete and results exist', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EntityList entity={mockEntities} searchTerm="test" loading={false} type="org" />
        </TestWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('Org 1')).toBeInTheDocument();
    expect(screen.getByText('Org 2')).toBeInTheDocument();
  });

  it('renders no data text when search is complete but no results', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EntityList entity={[]} searchTerm="test" loading={false} type="org" />
        </TestWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('No league found')).toBeInTheDocument();
  });

  it('renders no data text with correct type label for team', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EntityList entity={[]} searchTerm="test" loading={false} type="team" />
        </TestWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText('No team found')).toBeInTheDocument();
  });

  it('does not render no data text while loading', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EntityList entity={[]} searchTerm="test" loading={true} type="org" />
        </TestWrapper>
      </MemoryRouter>
    );

    expect(screen.queryByText('No org found')).not.toBeInTheDocument();
  });
});
