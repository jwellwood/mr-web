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
  default: ({ results }: { results: { _id: string }[] }) => (
    <div data-testid="result-table" data-result-ids={results.map(result => result._id).join(',')}>
      {results.length} results
    </div>
  ),
}));

vi.mock('../ByeGames', () => ({
  default: ({ results }: { results: T_FETCH_RESULTS['results'] }) => (
    <div data-testid="bye-games">{results.map(result => result._id).join(',')}</div>
  ),
}));

vi.mock('../../../../../components/accordion', () => ({
  CustomAccordion: ({
    children,
    title,
    isExpanded,
  }: {
    children: React.ReactNode;
    title: React.ReactNode;
    isExpanded: boolean;
  }) => (
    <div data-testid="accordion" data-expanded={String(isExpanded)}>
      <div data-testid="accordion-title-wrapper">{title}</div>
      <div data-testid="accordion-content">{children}</div>
    </div>
  ),
}));

vi.mock('../../../../../components', () => ({
  SectionContainer: ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
    <div data-testid="section-container">
      <div data-testid="section-subtitle">{subtitle}</div>
      {children}
    </div>
  ),
  CustomTypography: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
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
        <AccordionSection gameWeek="1" gwResults={[makeResult()]} isExpanded={false} {...props} />
      </TestWrapper>
    </MemoryRouter>
  );

describe('AccordionSection', () => {
  it('renders the accordion', () => {
    renderSection();
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    expect(screen.getByTestId('accordion')).toHaveAttribute('data-expanded', 'false');
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
    const subtitles = screen.getAllByTestId('section-subtitle');
    expect(subtitles[0]).toHaveTextContent('Parsed:2020-06-15');
    expect(subtitles[1]).toHaveTextContent('Parsed:2020-06-01');
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

  it('sorts fixtures by kickoff time earliest first', () => {
    renderSection({
      gwResults: [
        makeResult({ _id: 'late', kickoffTime: '18:00' }),
        makeResult({ _id: 'early', kickoffTime: '09:00' }),
        makeResult({ _id: 'middle', kickoffTime: '12:00' }),
        makeResult({ _id: 'default-time', kickoffTime: null }),
      ],
    });

    expect(screen.getByTestId('result-table')).toHaveAttribute(
      'data-result-ids',
      'early,default-time,middle,late'
    );
  });

  it('renders bye games separately from the dated result tables', () => {
    renderSection({
      gwResults: [makeResult({ _id: 'normal-1' }), makeResult({ _id: 'bye-1', isBye: true })],
    });

    expect(screen.getByTestId('result-table')).toHaveTextContent('1 results');
    expect(screen.getByTestId('bye-games')).toHaveTextContent('bye-1');
  });
});
