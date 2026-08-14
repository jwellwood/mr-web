import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import ResultScoreBox from '../ResultScoreBox';

const PAST = '2020-01-01T10:00:00.000Z';

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

  it('renders the goal value for a past date', () => {
    renderBox({ goals: 3, date: PAST });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders "0" (not "-") for a past date when goals is 0', () => {
    renderBox({ goals: 0, resultStatus: 'SUBMITTED', date: PAST });
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText('-')).not.toBeInTheDocument();
  });
});
