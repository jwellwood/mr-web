import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { CustomTypography } from '../../../typography';
import ListItemLink from '../ListItemLink';

const mockData = {
  label: 'Label Text',
  secondary: 'Secondary Text',
  link: '/test-link',
  value: 'Val',
};

describe('ListItemLink', () => {
  it('renders label, secondary and value', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <ListItemLink data={mockData} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('Label Text')).toBeInTheDocument();
    expect(screen.getByText('Secondary Text')).toBeInTheDocument();
    expect(screen.getByText('Val')).toBeInTheDocument();
  });

  it('renders React element value unchanged', () => {
    const dataWithNode = {
      ...mockData,
      value: <CustomTypography color="data">NodeVal</CustomTypography>,
    };
    render(
      <TestWrapper>
        <MemoryRouter>
          <ListItemLink data={dataWithNode} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('NodeVal')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <TestWrapper>
        <MemoryRouter>
          <ListItemLink data={mockData} onClick={onClick} />
        </MemoryRouter>
      </TestWrapper>
    );

    const anchor = screen.getByText('Label Text').closest('a');
    expect(anchor).toBeTruthy();
    await user.click(anchor!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
