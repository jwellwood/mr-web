import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { BATCH_CONFIRM_RESULTS, FETCH_RESULTS, T_FETCH_RESULTS } from '../../graphql';
import BatchConfirmResults from '../BatchConfirmResults';

const { mockUseMutation, mockConfirmResults } = vi.hoisted(() => ({
  mockUseMutation: vi.fn(),
  mockConfirmResults: vi.fn(),
}));

vi.mock('@apollo/client/react', () => ({
  useMutation: (...args: unknown[]) => mockUseMutation(...args),
}));

vi.mock('../../../../hooks', () => ({
  useCustomParams: () => ({ orgId: 'org-1', orgSeasonId: 'season-1' }),
}));

vi.mock('../../../../components/modals/confirmation-modal/ConfirmationModal', () => ({
  default: ({ children, onConfirm }: { children: React.ReactNode; onConfirm: () => void }) => (
    <div>
      {children}
      <button data-testid="confirm-batch" onClick={onConfirm} />
    </div>
  ),
}));

const makeResult = (id: string) =>
  ({
    _id: id,
    competitionId: { _id: 'competition-1', name: 'League' },
    homeTeam: { _id: `home-${id}`, teamName: `Home ${id}` },
    awayTeam: { _id: `away-${id}`, teamName: `Away ${id}` },
    homeGoals: 2,
    awayGoals: 1,
  }) as T_FETCH_RESULTS['results'][number];

describe('BatchConfirmResults', () => {
  beforeEach(() => {
    mockConfirmResults.mockReset().mockResolvedValue({});
    mockUseMutation
      .mockReset()
      .mockReturnValue([mockConfirmResults, { loading: false, error: undefined }]);
  });

  it('confirms all supplied results and refetches their competition', async () => {
    const results = [makeResult('result-1'), makeResult('result-2')];
    render(
      <TestWrapper>
        <BatchConfirmResults results={results} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByTestId('confirm-batch'));

    await waitFor(() =>
      expect(mockConfirmResults).toHaveBeenCalledWith({
        variables: { orgId: 'org-1', resultIds: ['result-1', 'result-2'] },
      })
    );
    expect(mockUseMutation).toHaveBeenCalledWith(
      BATCH_CONFIRM_RESULTS,
      expect.objectContaining({
        refetchQueries: [
          {
            query: FETCH_RESULTS,
            variables: { orgId: 'org-1', orgSeasonId: 'season-1', competitionId: 'competition-1' },
          },
        ],
        onError: expect.any(Function),
      })
    );
  });
});
