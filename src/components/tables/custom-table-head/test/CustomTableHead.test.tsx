import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import type { ColumnConfig } from '../../types';
import CustomTableHead from '../CustomTableHead';

type Row = { name: string; goals: number };

const columns: readonly ColumnConfig<Row>[] = [
  { id: 'name', label: 'Name' },
  { id: 'goals', label: 'Goals' },
];

describe('CustomTableHead', () => {
  it('renders column labels', () => {
    render(
      <TestWrapper>
        <table>
          <CustomTableHead
            columns={columns}
            onRequestSort={vi.fn()}
            sortBy="goals"
            isSortable={false}
          />
        </table>
      </TestWrapper>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Goals')).toBeInTheDocument();
  });

  it('calls onRequestSort with the column id when a sortable label is clicked', async () => {
    const onRequestSort = vi.fn();
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <table>
          <CustomTableHead
            columns={columns}
            onRequestSort={onRequestSort}
            sortBy="name"
            isSortable
          />
        </table>
      </TestWrapper>
    );

    await user.click(screen.getByText('Goals'));
    expect(onRequestSort).toHaveBeenCalledWith(expect.anything(), 'goals');
  });

  it('renders a thead element', () => {
    const { container } = render(
      <TestWrapper>
        <table>
          <CustomTableHead columns={columns} onRequestSort={vi.fn()} isSortable={false} />
        </table>
      </TestWrapper>
    );
    expect(container.querySelector('thead')).toBeInTheDocument();
  });

  it('renders a cell for each column', () => {
    const { container } = render(
      <TestWrapper>
        <table>
          <CustomTableHead columns={columns} onRequestSort={vi.fn()} isSortable={false} />
        </table>
      </TestWrapper>
    );
    expect(container.querySelectorAll('th').length).toBe(columns.length);
  });

  it('renders empty-label columns without label text', () => {
    const iconColumns: readonly ColumnConfig[] = [
      { id: 'icon', label: '' },
      { id: 'name', label: 'Name' },
    ];
    render(
      <TestWrapper>
        <table>
          <CustomTableHead columns={iconColumns} onRequestSort={vi.fn()} isSortable={false} />
        </table>
      </TestWrapper>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
