import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { ColumnConfig } from '../types';
import CustomTable from './CustomTable';

describe('CustomTable', () => {
  it('renders header label and cell value', () => {
    const columns = [{ id: 'a', label: 'Label A' }] as ColumnConfig[];
    const rows = [{ a: 'one' }];

    render(<CustomTable rows={rows} columns={columns} isSortable={false} loadingRowCount={1} />);

    expect(screen.getByText('Label A')).toBeTruthy();
    expect(screen.getByText('one')).toBeTruthy();
  });
});
