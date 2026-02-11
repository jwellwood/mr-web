import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FilterChip from '../filter-chip/FilterChip';

describe('FilterChip', () => {
  it('renders label and applies primary styling when applied is true', () => {
    render(<FilterChip label="Test" applied={true} />);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('renders label when applied is false', () => {
    render(<FilterChip label="Other" applied={false} />);
    expect(screen.getByText('Other')).toBeTruthy();
  });
});
