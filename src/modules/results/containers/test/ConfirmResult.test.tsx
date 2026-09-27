import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { FETCH_RESULT } from '../../graphql';
import { CONFIRM_RESULT } from '../../graphql/CONFIRM_RESULT';
import ConfirmResult from '../ConfirmResult';

const { mockUseMutation, mockConfirmResult } = vi.hoisted(() => ({
  mockUseMutation: vi.fn(),
  mockConfirmResult: vi.fn(),
}));

vi.mock('@apollo/client/react', () => ({
  useMutation: (...args: unknown[]) => mockUseMutation(...args),
}));

vi.mock('../../../../hooks', () => ({
  useCustomParams: () => ({ resultId: 'result-1' }),
}));

vi.mock('../../components/ConfirmResultView', () => ({
  default: ({ onConfirm, onDispute }: { onConfirm: () => void; onDispute: () => void }) => (
    <>
      <button data-testid="confirm-action" onClick={onConfirm} />
      <button data-testid="dispute-action" onClick={onDispute} />
    </>
  ),
}));

const renderConfirmResult = () =>
  render(
    <TestWrapper>
      <ConfirmResult />
    </TestWrapper>
  );

describe('ConfirmResult', () => {
  beforeEach(() => {
    mockConfirmResult.mockReset().mockResolvedValue({});
    mockUseMutation
      .mockReset()
      .mockReturnValue([mockConfirmResult, { loading: false, error: undefined }]);
  });

  it('confirms the result and refetches it', async () => {
    renderConfirmResult();

    fireEvent.click(screen.getByTestId('confirm-action'));

    await waitFor(() =>
      expect(mockConfirmResult).toHaveBeenCalledWith({
        variables: { resultId: 'result-1', isConfirmed: true },
        refetchQueries: [{ query: FETCH_RESULT, variables: { resultId: 'result-1' } }],
      })
    );
    expect(mockUseMutation).toHaveBeenCalledWith(
      CONFIRM_RESULT,
      expect.objectContaining({ onError: expect.any(Function) })
    );
  });

  it('marks the result disputed and refetches it', async () => {
    renderConfirmResult();

    fireEvent.click(screen.getByTestId('dispute-action'));

    await waitFor(() =>
      expect(mockConfirmResult).toHaveBeenCalledWith({
        variables: { resultId: 'result-1', isConfirmed: false },
        refetchQueries: [{ query: FETCH_RESULT, variables: { resultId: 'result-1' } }],
      })
    );
  });
});
