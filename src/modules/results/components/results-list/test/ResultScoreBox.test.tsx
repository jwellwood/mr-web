import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { theme } from '../../../../../theme';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import ResultScoreBox from '../ResultScoreBox';

const PAST = '2020-01-01T10:00:00.000Z';
const FUTURE = '2099-01-01T10:00:00.000Z';

const renderBox = (props: React.ComponentProps<typeof ResultScoreBox>) =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <ResultScoreBox {...props} />
      </TestWrapper>
    </MemoryRouter>
  );

describe('ResultScoreBox', () => {
  it('renders "-" when no date is provided', () => {
    renderBox({ goals: 2, resultStatus: 'SUBMITTED' });
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders "-" for a future date regardless of goals', () => {
    renderBox({ goals: 3, resultStatus: 'SUBMITTED', date: FUTURE });
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders "-" for a future date when goals is 0', () => {
    renderBox({ goals: 0, date: FUTURE });
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders the goal value for a past date', () => {
    renderBox({ goals: 3, date: PAST });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders "0" (not "-") for a past date when goals is 0', () => {
    renderBox({ goals: 0, resultStatus: 'SUBMITTED', date: PAST });
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText('-')).not.toBeInTheDocument();
  });

  it('applies info (blue) border for SUBMITTED status on a past date', () => {
    const { container } = renderBox({ goals: 1, resultStatus: 'SUBMITTED', date: PAST });
    const span = container.querySelector('span[style]');
    expect(span).toHaveStyle(`border: 2px solid ${theme.palette.info.main}`);
  });

  it('applies error (red) border for DISPUTED status on a past date', () => {
    const { container } = renderBox({ goals: 2, resultStatus: 'DISPUTED', date: PAST });
    const span = container.querySelector('span[style]');
    expect(span).toHaveStyle(`border: 2px solid ${theme.palette.error.main}`);
  });

  it('applies warning (orange) border for PENDING status on a past date', () => {
    const { container } = renderBox({ goals: 0, resultStatus: 'PENDING', date: PAST });
    const span = container.querySelector('span[style]');
    expect(span).toHaveStyle(`border: 2px solid ${theme.palette.warning.main}`);
  });

  it('applies warning border when resultStatus is null on a past date', () => {
    const { container } = renderBox({ goals: 1, resultStatus: null, date: PAST });
    const span = container.querySelector('span[style]');
    expect(span).toHaveStyle(`border: 2px solid ${theme.palette.warning.main}`);
  });

  it('renders goals without a border for CONFIRMED status on a past date', () => {
    const { container } = renderBox({ goals: 2, resultStatus: 'CONFIRMED', date: PAST });
    expect(container.querySelector('span[style]')).not.toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders "-" without a border when no date is provided', () => {
    const { container } = renderBox({ goals: 5 });
    expect(container.querySelector('span[style]')).not.toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
