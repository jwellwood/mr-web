import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import type { ColumnConfig } from '../../types';
import CustomTableBody from '../CustomTableBody';

type Row = { name: string; goals: number };

const columns: ColumnConfig<Row>[] = [
  { id: 'name', label: 'Name' },
  { id: 'goals', label: 'Goals' },
];

const columnMap = new Map<string, ColumnConfig<Row>>(columns.map(c => [c.id as string, c]));

const rows: Row[] = [
  { name: 'Alice', goals: 5 },
  { name: 'Bob', goals: 3 },
];

describe('CustomTableBody', () => {
  it('renders a row for each data entry', () => {
    render(
      <TestWrapper>
        <table>
          <CustomTableBody rows={rows} columnMap={columnMap} sortBy="goals" />
        </table>
      </TestWrapper>
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders all cell values', () => {
    render(
      <TestWrapper>
        <table>
          <CustomTableBody rows={rows} columnMap={columnMap} sortBy="goals" />
        </table>
      </TestWrapper>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders skeleton cells when loading with no rows', () => {
    const { container } = render(
      <TestWrapper>
        <table>
          <CustomTableBody
            rows={[]}
            columnMap={columnMap}
            sortBy="goals"
            loading
            loadingRowCount={3}
          />
        </table>
      </TestWrapper>
    );
    expect(container.querySelectorAll('[class*="MuiSkeleton"]').length).toBeGreaterThan(0);
  });

  it('renders nothing when rows array is empty and not loading', () => {
    const { container } = render(
      <TestWrapper>
        <table>
          <CustomTableBody rows={[]} columnMap={columnMap} sortBy="goals" />
        </table>
      </TestWrapper>
    );
    // tbody should be present but empty
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelector('tr')).not.toBeInTheDocument();
  });
});
