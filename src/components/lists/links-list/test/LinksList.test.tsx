import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import LinksList from '../LinksList';

const mockLinks = [
  {
    label: 'One',
    link: '/one',
    value: '1',
  },
  {
    label: 'Two',
    link: '/two',
    value: '2',
  },
];

describe('LinksList', () => {
  it('renders list items when not loading', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <LinksList links={mockLinks} loading={false} />
        </MemoryRouter>
      </TestWrapper>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('renders loading skeleton when loading is true and respects rows', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <LinksList links={mockLinks} loading={true} rows={3} />
        </MemoryRouter>
      </TestWrapper>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it('calls onClick passed to ListItemLink', async () => {
    const user = (await import('@testing-library/user-event')).default.setup();
    const onClick = vi.fn();

    render(
      <TestWrapper>
        <MemoryRouter>
          <LinksList links={mockLinks} loading={false} onClick={onClick} />
        </MemoryRouter>
      </TestWrapper>
    );

    const first = screen.getByText('One');
    const anchor = first.closest('a');
    expect(anchor).toBeTruthy();
    await user.click(anchor!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
