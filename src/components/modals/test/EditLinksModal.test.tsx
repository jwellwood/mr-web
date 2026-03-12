import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import type { IListItem } from '../../lists';
import EditLinksModal from '../edit-links-modal/EditLinksModal';

const sampleLinks: IListItem[] = [
  { label: 'Add Player', type: 'add', link: '/add-player' },
  { label: 'Edit Team', type: 'edit', link: '/edit-team' },
];

describe('EditLinksModal', () => {
  it('renders the Admin trigger button', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <EditLinksModal data={sampleLinks} />
        </MemoryRouter>
      </TestWrapper>
    );
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
  });

  it('opens dialog with links when Admin is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <MemoryRouter>
          <EditLinksModal data={sampleLinks} />
        </MemoryRouter>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /admin/i }));
    expect(screen.getByText('Add Player')).toBeInTheDocument();
    expect(screen.getByText('Edit Team')).toBeInTheDocument();
  });

  it('renders dialog title when provided', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <MemoryRouter>
          <EditLinksModal data={sampleLinks} title="Admin Actions" />
        </MemoryRouter>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /admin/i }));
    expect(screen.getByText('Admin Actions')).toBeInTheDocument();
  });

  it('renders only add-type links when no edit links provided', async () => {
    const user = userEvent.setup();
    const addOnly: IListItem[] = [{ label: 'Add Match', type: 'add', link: '/add-match' }];
    render(
      <TestWrapper>
        <MemoryRouter>
          <EditLinksModal data={addOnly} />
        </MemoryRouter>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /admin/i }));
    expect(screen.getByText('Add Match')).toBeInTheDocument();
  });
});
