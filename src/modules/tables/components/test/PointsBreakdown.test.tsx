import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import PointsBreakdown from '../PointsBreakdown';

describe('PointsBreakdown', () => {
  it('opens the drawer with starting, earned, and total points', () => {
    render(
      <TestWrapper>
        <PointsBreakdown
          item={{ points: 12 }}
          startingPoints={3}
          earnedPoints={9}
          totalPoints={12}
        />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('12'));

    expect(screen.getByText('Points breakdown')).toBeInTheDocument();
    expect(screen.getByText('Initial points')).toBeInTheDocument();
    expect(screen.getByText('Earned points')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getAllByText('3')).toHaveLength(2);
    expect(screen.getAllByText('9')).toHaveLength(2);
    expect(screen.getByRole('dialog')).toHaveTextContent('3 + 9 = 12');
  });
});
