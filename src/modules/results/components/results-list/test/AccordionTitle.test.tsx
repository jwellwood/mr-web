import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { T_FETCH_RESULTS } from '../../../graphql';
import AccordionTitle from '../AccordionTitle';

vi.mock('react-i18next', async importOriginal => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return { ...actual, useTranslation: () => ({ t: (key: string) => key }) };
});

const mockUseAuth = vi.fn();
vi.mock('../../../../../hooks', () => ({
  useCustomParams: () => ({ orgId: 'org-1', orgSeasonId: 'os-1' }),
  useAuth: (...args: unknown[]) => mockUseAuth(...args),
}));

vi.mock('../../../containers/BatchConfirmResults', () => ({
  default: ({ resultIds }: { resultIds: string[] }) => (
    <div data-testid="batch-confirm">{resultIds.length} ids</div>
  ),
}));

vi.mock('../../../../../components/icons', () => ({
  AppIcon: ({ icon }: { icon: string }) => <span data-testid={`icon-${icon}`} />,
}));

const PAST = '2020-01-01T10:00:00.000Z';
const FUTURE = '2099-01-01T10:00:00.000Z';

const makeResult = (overrides: Partial<T_FETCH_RESULTS['results'][number]> = {}) =>
  ({
    _id: 'r-1',
    date: PAST,
    resultStatus: null,
    homeTeam: { _id: 'h-1', teamName: 'Home' },
    awayTeam: { _id: 'a-1', teamName: 'Away' },
    homeGoals: 1,
    awayGoals: 0,
    kickoffTime: '10:00',
    gameWeek: 1,
    isForfeit: false,
    isComplete: false,
    competitionId: { _id: 'c-1', name: 'Cup' },
    orgSeasonId: { _id: 'os-1' },
    homeGoalscorers: [],
    awayGoalscorers: [],
    submittedByTeam: null,
    confirmedByTeam: null,
    ...overrides,
  }) as T_FETCH_RESULTS['results'][number];

const renderTitle = (props: Partial<React.ComponentProps<typeof AccordionTitle>> = {}) =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <AccordionTitle gameWeek="1" gwResults={[makeResult()]} isExpanded={false} {...props} />
      </TestWrapper>
    </MemoryRouter>
  );

describe('AccordionTitle', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ isOrgAuth: false });
  });

  it('renders the round number and game count', () => {
    renderTitle({ gameWeek: '3', gwResults: [makeResult(), makeResult({ _id: 'r-2' })] });
    expect(screen.getByText(/ROUND 3/)).toBeInTheDocument();
    expect(screen.getByText(/2 GAMEs/)).toBeInTheDocument();
  });

  it('uses singular "GAME" (no trailing s) for a single result', () => {
    renderTitle({ gwResults: [makeResult()] });
    expect(screen.getByText(/1 GAME$/)).toBeInTheDocument();
  });

  it('shows the pending icon for a past match with no status', () => {
    renderTitle({ gwResults: [makeResult({ date: PAST, resultStatus: null })] });
    expect(screen.getByTestId('icon-pending')).toBeInTheDocument();
  });

  it('does not show the pending icon for a future match with no status', () => {
    renderTitle({ gwResults: [makeResult({ date: FUTURE, resultStatus: null })] });
    expect(screen.queryByTestId('icon-pending')).not.toBeInTheDocument();
  });

  it('shows the disputed icon when a result is disputed', () => {
    renderTitle({ gwResults: [makeResult({ resultStatus: 'DISPUTED' as never })] });
    expect(screen.getByTestId('icon-disputed')).toBeInTheDocument();
  });

  it('shows the submitted icon when a result is submitted', () => {
    renderTitle({ gwResults: [makeResult({ resultStatus: 'SUBMITTED' as never })] });
    expect(screen.getByTestId('icon-submitted')).toBeInTheDocument();
  });

  it('shows BatchConfirmResults when isOrgAuth and there are submitted results', () => {
    mockUseAuth.mockReturnValue({ isOrgAuth: true });
    renderTitle({ gwResults: [makeResult({ resultStatus: 'SUBMITTED' as never })] });
    expect(screen.getByTestId('batch-confirm')).toBeInTheDocument();
  });

  it('does not show BatchConfirmResults when not org auth', () => {
    mockUseAuth.mockReturnValue({ isOrgAuth: false });
    renderTitle({ gwResults: [makeResult({ resultStatus: 'SUBMITTED' as never })] });
    expect(screen.queryByTestId('batch-confirm')).not.toBeInTheDocument();
  });

  it('does not show BatchConfirmResults when there are no submitted results', () => {
    mockUseAuth.mockReturnValue({ isOrgAuth: true });
    renderTitle({ gwResults: [makeResult({ resultStatus: 'CONFIRMED' as never })] });
    expect(screen.queryByTestId('batch-confirm')).not.toBeInTheDocument();
  });

  it('does not show any count icons when all matches are future and confirmed', () => {
    renderTitle({
      gwResults: [makeResult({ date: FUTURE, resultStatus: 'CONFIRMED' as never })],
    });
    expect(screen.queryByTestId('icon-pending')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-disputed')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-submitted')).not.toBeInTheDocument();
  });
});
