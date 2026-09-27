import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { T_FETCH_RESULTS } from '../../../graphql';
import ResultsAccordion from '../ResultsAccordion';

vi.mock('../AccordionSection', () => ({
  default: ({
    competitionName,
    gameWeek,
    isExpanded,
  }: {
    competitionName: string;
    gameWeek: string;
    isExpanded: boolean;
  }) => (
    <div
      data-testid="accordion-section"
      data-competition={competitionName}
      data-gameweek={gameWeek}
      data-expanded={String(isExpanded)}
    />
  ),
}));

vi.mock('../TeamResults', () => ({
  default: ({
    results,
    selectedTeam,
  }: {
    results: T_FETCH_RESULTS['results'];
    selectedTeam: string;
  }) => (
    <div
      data-testid="team-results"
      data-selected-team={selectedTeam}
      data-result-ids={results.map(result => result._id).join(',')}
    />
  ),
}));

const SearchParamsDisplay = () => {
  const [searchParams] = useSearchParams();
  return <div data-testid="search-params">{searchParams.toString()}</div>;
};

const makeResult = (overrides: Partial<T_FETCH_RESULTS['results'][number]> = {}) =>
  ({
    _id: 'r-1',
    date: '2020-06-01T10:00:00.000Z',
    resultStatus: null,
    homeTeam: { _id: 'h-1', teamName: 'Home' },
    awayTeam: { _id: 'a-1', teamName: 'Away' },
    homeGoals: 1,
    awayGoals: 0,
    kickoffTime: '10:00',
    gameWeek: 1,
    isForfeit: false,
    competitionId: { _id: 'c-1', name: 'League' },
    orgSeasonId: { _id: 'os-1' },
    homeGoalscorers: [],
    awayGoalscorers: [],
    submittedByTeam: null,
    confirmedByTeam: null,
    ...overrides,
  }) as T_FETCH_RESULTS['results'][number];

const renderAccordion = (
  props: React.ComponentProps<typeof ResultsAccordion>,
  initialEntries = ['/']
) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <TestWrapper>
        <ResultsAccordion {...props} />
      </TestWrapper>
    </MemoryRouter>
  );

describe('ResultsAccordion', () => {
  it('renders one AccordionSection per gameweek in a single competition', () => {
    const results = [
      makeResult({ _id: 'r-1', gameWeek: 1 }),
      makeResult({ _id: 'r-2', gameWeek: 2 }),
    ];
    renderAccordion({ results });
    expect(screen.getAllByTestId('accordion-section')).toHaveLength(2);
  });

  it('restores the selected team from the URL', () => {
    renderAccordion({ results: [makeResult()] }, ['/?teamId=h-1']);

    expect(screen.getByTestId('team-results')).toHaveAttribute('data-selected-team', 'h-1');
    expect(screen.queryByTestId('accordion-section')).not.toBeInTheDocument();
  });

  it('stores the selected team in the URL', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <>
            <ResultsAccordion results={[makeResult()]} />
            <SearchParamsDisplay />
          </>
        </TestWrapper>
      </MemoryRouter>
    );

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Home' }));

    expect(screen.getByTestId('search-params')).toHaveTextContent('teamId=h-1');
    expect(screen.getByTestId('team-results')).toHaveAttribute('data-selected-team', 'h-1');
  });

  it('shows only results involving the selected team', () => {
    const results = [
      makeResult({ _id: 'home-match', gameWeek: 1 }),
      makeResult({
        _id: 'other-match',
        gameWeek: 1,
        homeTeam: { _id: 'h-2', teamName: 'Other Home' },
        awayTeam: { _id: 'a-2', teamName: 'Other Away' },
      }),
      makeResult({
        _id: 'away-match',
        gameWeek: 2,
        homeTeam: { _id: 'h-3', teamName: 'Another Home' },
        awayTeam: { _id: 'h-1', teamName: 'Home' },
      }),
    ];
    renderAccordion({ results }, ['/?teamId=h-1']);

    const visibleResultIds = screen
      .getAllByTestId('team-results')
      .flatMap(result => result.getAttribute('data-result-ids')!.split(','))
      .sort();
    expect(visibleResultIds).toEqual(['away-match', 'home-match']);
  });

  it('expands the first gameweek when isFixture is false', () => {
    const results = [
      makeResult({ _id: 'r-1', gameWeek: 1, date: '2020-06-01T10:00:00.000Z' }),
      makeResult({ _id: 'r-2', gameWeek: 2, date: '2020-06-08T10:00:00.000Z' }),
    ];
    renderAccordion({ results });
    // In results mode (non-fixture) the first gameweek entry (index 0, after reverse) is expanded
    const sections = screen.getAllByTestId('accordion-section');
    const expandedSections = sections.filter(s => s.getAttribute('data-expanded') === 'true');
    expect(expandedSections).toHaveLength(1);
  });

  it('expands the closest upcoming gameweek when isFixture is true', () => {
    const today = new Date();
    const pastDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const results = [
      makeResult({ _id: 'r-1', gameWeek: 1, date: pastDate }),
      makeResult({ _id: 'r-2', gameWeek: 2, date: futureDate }),
    ];
    renderAccordion({ results });
    const sections = screen.getAllByTestId('accordion-section');
    const expandedSection = sections.find(s => s.getAttribute('data-expanded') === 'true');
    expect(expandedSection).toBeDefined();
    expect(expandedSection?.getAttribute('data-gameweek')).toBe('2');
  });

  it('renders nothing when given an empty results array', () => {
    renderAccordion({ results: [] });
    expect(screen.queryByTestId('accordion-section')).not.toBeInTheDocument();
  });
});
