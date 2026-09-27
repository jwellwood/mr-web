import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { FETCH_RESULT } from '../../graphql';
import { SUBMIT_RESULT } from '../../graphql/SUBMIT_RESULT';
import SubmitResult from '../SubmitResult';

const { mockUseMutation, mockSubmitResult } = vi.hoisted(() => ({
  mockUseMutation: vi.fn(),
  mockSubmitResult: vi.fn(),
}));

vi.mock('@apollo/client/react', () => ({
  useMutation: (...args: unknown[]) => mockUseMutation(...args),
}));

vi.mock('../../../../hooks', () => ({
  useCustomParams: () => ({ resultId: 'result-1' }),
}));

vi.mock('../../forms/submit-result/SubmitResultForm', () => ({
  default: ({
    defaultValues,
    homeTeamName,
    awayTeamName,
    onSubmit,
  }: {
    defaultValues: { homeGoals: number; awayGoals: number; isForfeit: boolean };
    homeTeamName?: string;
    awayTeamName?: string;
    onSubmit: (formData: { homeGoals: number; awayGoals: number; isForfeit: boolean }) => void;
  }) => (
    <div
      data-testid="submit-form"
      data-home-goals={defaultValues.homeGoals}
      data-away-goals={defaultValues.awayGoals}
      data-forfeit={String(defaultValues.isForfeit)}
      data-home-team={homeTeamName}
      data-away-team={awayTeamName}
    >
      <button
        data-testid="submit-result"
        onClick={() => onSubmit({ homeGoals: 3, awayGoals: 1, isForfeit: true })}
      />
    </div>
  ),
}));

const renderSubmitResult = (props: React.ComponentProps<typeof SubmitResult> = {}) =>
  render(
    <TestWrapper>
      <SubmitResult {...props} />
    </TestWrapper>
  );

describe('SubmitResult', () => {
  beforeEach(() => {
    mockSubmitResult.mockReset().mockResolvedValue({});
    mockUseMutation
      .mockReset()
      .mockReturnValue([mockSubmitResult, { loading: false, error: undefined }]);
  });

  it('uses the current scores and submits the result with a refetch', async () => {
    renderSubmitResult({ homeTeamName: 'Home', awayTeamName: 'Away', homeGoals: 2, awayGoals: 0 });

    expect(screen.getByTestId('submit-form')).toHaveAttribute('data-home-goals', '2');
    expect(screen.getByTestId('submit-form')).toHaveAttribute('data-away-goals', '0');
    expect(screen.getByTestId('submit-form')).toHaveAttribute('data-home-team', 'Home');
    expect(screen.getByTestId('submit-form')).toHaveAttribute('data-away-team', 'Away');

    fireEvent.click(screen.getByTestId('submit-result'));

    await waitFor(() =>
      expect(mockSubmitResult).toHaveBeenCalledWith({
        variables: {
          resultId: 'result-1',
          homeGoals: 3,
          awayGoals: 1,
          isForfeit: true,
        },
      })
    );
    expect(mockUseMutation).toHaveBeenCalledWith(
      SUBMIT_RESULT,
      expect.objectContaining({
        refetchQueries: [{ query: FETCH_RESULT, variables: { resultId: 'result-1' } }],
        onError: expect.any(Function),
      })
    );
  });

  it('defaults missing scores to zero', () => {
    renderSubmitResult();

    expect(screen.getByTestId('submit-form')).toHaveAttribute('data-home-goals', '0');
    expect(screen.getByTestId('submit-form')).toHaveAttribute('data-away-goals', '0');
    expect(screen.getByTestId('submit-form')).toHaveAttribute('data-forfeit', 'false');
  });
});
