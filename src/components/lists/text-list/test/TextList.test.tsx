import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import TextList from '../TextList';

const mockData = [
  { label: 'Alpha', secondary: 'A1', value: '10' },
  { label: 'Beta', secondary: 'B1', value: 20 },
];

describe('TextList', () => {
  it('renders items with label and value', () => {
    render(
      <TestWrapper>
        <TextList data={mockData} loading={false} />
      </TestWrapper>
    );

    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('A1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('B1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('shows skeletons for loading state', () => {
    render(
      <TestWrapper>
        <TextList data={mockData} loading={true} />
      </TestWrapper>
    );

    // When loading, numeric/string values should not be displayed
    expect(screen.queryByText('10')).not.toBeInTheDocument();
    expect(screen.queryByText('20')).not.toBeInTheDocument();

    // Labels should still be present (skeleton replaces primary)
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('calls onClick when list item is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    const withOnClick = [{ ...mockData[0], onClick }];

    render(
      <TestWrapper>
        <TextList data={withOnClick} loading={false} />
      </TestWrapper>
    );

    const item = screen.getByText('Alpha');
    await user.click(item);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
