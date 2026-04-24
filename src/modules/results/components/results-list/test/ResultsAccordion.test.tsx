import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { T_FETCH_RESULTS } from '../../../graphql';
import ResultsAccordion from '../ResultsAccordion';

vi.mock('../AccordionSection', () => ({
  default: ({
    competitionName,
    gameWeek,
    isExpanded,
    isFixture,
  }: {
    competitionName: string;
    gameWeek: string;
    isExpanded: boolean;
    isFixture?: boolean;
  }) => (
    <div
      data-testid="accordion-section"
      data-competition={competitionName}
      data-gameweek={gameWeek}
      data-expanded={String(isExpanded)}
      data-fixture={String(isFixture)}
    />
  ),
}));

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
    isComplete: false,
    competitionId: { _id: 'c-1', name: 'League' },
    orgSeasonId: { _id: 'os-1' },
    homeGoalscorers: [],
    awayGoalscorers: [],
    submittedByTeam: null,
    confirmedByTeam: null,
    ...overrides,
  }) as T_FETCH_RESULTS['results'][number];

const renderAccordion = (props: React.ComponentProps<typeof ResultsAccordion>) =>
  render(
    <MemoryRouter>
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

  it('groups results by competition into separate accordion sections', () => {
    const results = [
      makeResult({ _id: 'r-1', competitionId: { _id: 'c-1', name: 'League' } }),
      makeResult({ _id: 'r-2', competitionId: { _id: 'c-2', name: 'Cup' } }),
    ];
    renderAccordion({ results });
    const sections = screen.getAllByTestId('accordion-section');
    const competitions = sections.map(s => s.getAttribute('data-competition'));
    expect(competitions).toContain('League');
    expect(competitions).toContain('Cup');
  });

  it('expands the first gameweek when isFixture is false', () => {
    const results = [
      makeResult({ _id: 'r-1', gameWeek: 1, date: '2020-06-01T10:00:00.000Z' }),
      makeResult({ _id: 'r-2', gameWeek: 2, date: '2020-06-08T10:00:00.000Z' }),
    ];
    renderAccordion({ results, isFixture: false });
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
    renderAccordion({ results, isFixture: true });
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
