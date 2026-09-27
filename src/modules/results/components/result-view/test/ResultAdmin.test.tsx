import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { RESULT_STATUS } from '../../../constants';
import { T_FETCH_RESULT } from '../../../graphql';
import ResultAdmin from '../ResultAdmin';

const { mockUseAuth } = vi.hoisted(() => ({ mockUseAuth: vi.fn() }));

vi.mock('../../../../../hooks', () => ({
  useAuth: (teamId?: string, orgId?: string) => mockUseAuth(teamId, orgId),
  useCustomParams: () => ({ orgId: 'org-1' }),
}));

vi.mock('../../../containers/SubmitResult', () => ({
  default: () => <div data-testid="submit-result" />,
}));

vi.mock('../../../containers/ConfirmResult', () => ({
  default: () => <div data-testid="confirm-result" />,
}));

vi.mock('../../../../goalscorers/containers/AddGoalscorers', () => ({
  default: ({ side }: { side: string }) => <div data-testid={`goalscorers-${side}`} />,
}));

const makeResult = (overrides: Partial<T_FETCH_RESULT['result']> = {}) =>
  ({
    _id: 'result-1',
    resultStatus: RESULT_STATUS.PENDING,
    submittedByTeam: null,
    confirmedByTeam: null,
    homeTeam: { _id: 'home-1', teamName: 'Home' },
    awayTeam: { _id: 'away-1', teamName: 'Away' },
    homeGoals: 2,
    awayGoals: 1,
    homeGoalscorers: [],
    awayGoalscorers: [],
    ...overrides,
  }) as T_FETCH_RESULT['result'];

const renderResultAdmin = (
  result: T_FETCH_RESULT['result'],
  auth: { homeTeam?: boolean; awayTeam?: boolean; org?: boolean }
) => {
  mockUseAuth.mockImplementation((teamId?: string, orgId?: string) => {
    if (orgId) return { isOrgAuth: Boolean(auth.org) };
    if (teamId === 'home-1') return { isTeamAuth: Boolean(auth.homeTeam) };
    if (teamId === 'away-1') return { isTeamAuth: Boolean(auth.awayTeam) };
    return { isTeamAuth: false };
  });

  return render(
    <TestWrapper>
      <ResultAdmin result={result} />
    </TestWrapper>
  );
};

describe('ResultAdmin', () => {
  beforeEach(() => {
    mockUseAuth.mockReset();
  });

  it('allows an organization admin to confirm a disputed result', () => {
    renderResultAdmin(makeResult({ resultStatus: RESULT_STATUS.DISPUTED }), { org: true });

    expect(screen.getByTestId('confirm-result')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-result')).not.toBeInTheDocument();
  });

  it('does not allow team admins to confirm a disputed result', () => {
    renderResultAdmin(makeResult({ resultStatus: RESULT_STATUS.DISPUTED }), { homeTeam: true });

    expect(screen.queryByTestId('confirm-result')).not.toBeInTheDocument();
  });

  it('allows only the team opposing the submitter to confirm a submitted result', () => {
    const result = makeResult({
      resultStatus: RESULT_STATUS.SUBMITTED,
      submittedByTeam: { _id: 'home-1', teamName: 'Home' },
    });

    const { unmount } = renderResultAdmin(result, { homeTeam: true });
    expect(screen.queryByTestId('confirm-result')).not.toBeInTheDocument();
    unmount();

    renderResultAdmin(result, { awayTeam: true });
    expect(screen.getByTestId('confirm-result')).toBeInTheDocument();
  });

  it('allows an organization admin to submit a pending result', () => {
    renderResultAdmin(makeResult(), { org: true });

    expect(screen.getByTestId('submit-result')).toBeInTheDocument();
    expect(screen.queryByTestId('confirm-result')).not.toBeInTheDocument();
  });

  it('does not show result actions to non-admins', () => {
    renderResultAdmin(makeResult(), {});

    expect(screen.queryByTestId('submit-result')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-result')).not.toBeInTheDocument();
  });
});
