import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ListLoading from '../ListLoading';

describe('ListLoading', () => {
  it('renders the requested number of skeleton rows', () => {
    render(
      <TestWrapper>
        <ListLoading rows={4} avatar label secondary value />
      </TestWrapper>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
  });

  it('renders without avatar when avatar prop false', () => {
    render(
      <TestWrapper>
        <ListLoading rows={2} label secondary value />
      </TestWrapper>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });
});
