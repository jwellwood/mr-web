import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { T_FETCH_RESULTS } from '../../../graphql';
import AccordionSection from '../AccordionSection';

vi.mock('../AccordionTitle', () => ({
  default: ({ gameWeek }: { gameWeek: string }) => (
    <div data-testid="accordion-title">Round {gameWeek}</div>
  ),
}));

vi.mock('../ResultTable', () => ({
  default: ({ results }: { results: unknown[] }) => (
    <div data-testid="result-table">{results.length} results</div>
  ),
}));

vi.mock('../../../../../components/accordion', () => ({
  CustomAccordion: ({ children, title }: { children: React.ReactNode; title: React.ReactNode }) => (
    <div data-testid="accordion">
      <div data-testid="accordion-title-wrapper">{title}</div>
      <div data-testid="accordion-content">{children}</div>
    </div>
  ),
}));

vi.mock('../../../../../components', () => ({
  SectionContainer: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div data-testid="section-container" data-title={title}>
      {children}
    </div>
  ),
}));

vi.mock('../../../../../utils', () => ({
  parseDate: (dateStr: string) => `Parsed:${dateStr}`,
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
    competitionId: { _id: 'c-1', name: 'Cup' },
    orgSeasonId: { _id: 'os-1' },
    homeGoalscorers: [],
    awayGoalscorers: [],
    submittedByTeam: null,
    confirmedByTeam: null,
    ...overrides,
  }) as T_FETCH_RESULTS['results'][number];

const renderSection = (props: Partial<React.ComponentProps<typeof AccordionSection>> = {}) =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <AccordionSection
          competitionName="League"
          gameWeek="1"
          gwResults={[makeResult()]}
          isExpanded={false}
          {...props}
        />
      </TestWrapper>
    </MemoryRouter>
  );

describe('AccordionSection', () => {
  it('renders the accordion', () => {
    renderSection();
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  it('renders the AccordionTitle with the correct gameWeek', () => {
    renderSection({ gameWeek: '5' });
    expect(screen.getByText('Round 5')).toBeInTheDocument();
  });

  it('creates one section per distinct date', () => {
    const results = [
      makeResult({ _id: 'r-1', date: '2020-06-01T10:00:00.000Z' }),
      makeResult({ _id: 'r-2', date: '2020-06-01T14:00:00.000Z' }), // same day
      makeResult({ _id: 'r-3', date: '2020-06-08T10:00:00.000Z' }), // different day
    ];
    renderSection({ gwResults: results });
    const sections = screen.getAllByTestId('section-container');
    expect(sections).toHaveLength(2);
  });

  it('sorts date sections with the most recent date first', () => {
    const results = [
      makeResult({ _id: 'r-1', date: '2020-06-01T10:00:00.000Z' }),
      makeResult({ _id: 'r-2', date: '2020-06-15T10:00:00.000Z' }),
    ];
    renderSection({ gwResults: results });
    const sections = screen.getAllByTestId('section-container');
    expect(sections[0]).toHaveAttribute('data-title', 'Parsed:2020-06-15');
    expect(sections[1]).toHaveAttribute('data-title', 'Parsed:2020-06-01');
  });

  it('passes the correct results to ResultTable for each date group', () => {
    const results = [
      makeResult({ _id: 'r-1', date: '2020-06-01T10:00:00.000Z' }),
      makeResult({ _id: 'r-2', date: '2020-06-01T12:00:00.000Z' }),
      makeResult({ _id: 'r-3', date: '2020-06-08T10:00:00.000Z' }),
    ];
    renderSection({ gwResults: results });
    const tables = screen.getAllByTestId('result-table');
    expect(tables).toHaveLength(2);
    expect(tables.find(t => t.textContent === '2 results')).toBeInTheDocument();
    expect(tables.find(t => t.textContent === '1 results')).toBeInTheDocument();
  });
});
