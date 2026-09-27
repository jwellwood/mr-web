import '@testing-library/jest-dom/vitest';
import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import ResultForm from '../ResultForm';
import { initialResultState, ResultFormData } from '../schema';

const { mockUseResultInputs } = vi.hoisted(() => ({ mockUseResultInputs: vi.fn() }));

vi.mock('../../../hooks', () => ({
  useResultInputs: (...args: unknown[]) => mockUseResultInputs(...args),
  useResultEffects: vi.fn(),
}));

const cupInputs = {
  loading: false,
  competitionOptions: [{ value: 'cup-1', label: 'Cup' }],
  teamOptions: [
    { value: 'home-1', label: 'Home' },
    { value: 'away-1', label: 'Away' },
  ],
  roundOptions: [{ value: '1', label: 'Round 1' }],
  decisionOptions: [{ value: 'EXTRA_TIME', label: 'Extra time' }],
  winnerSideOptions: [{ value: 'HOME', label: 'Home' }],
  isCup: true,
};

const renderResultForm = (
  values: Partial<ResultFormData> = {},
  inputs = cupInputs
): Promise<ReturnType<typeof render>> => {
  mockUseResultInputs.mockReturnValue(inputs);

  const rendered = render(
    <TestWrapper>
      <ResultForm
        onSubmit={vi.fn()}
        orgSeasonOptions={[{ value: 'season-1', label: 'Season' }]}
        defaultValues={{
          ...initialResultState,
          date: new Date('2020-01-01T12:00:00.000Z'),
          orgSeasonId: 'season-1',
          competitionId: 'cup-1',
          gameWeek: 1,
          homeTeam: 'home-1',
          awayTeam: 'away-1',
          homeGoals: 1,
          awayGoals: 1,
          ...values,
        }}
        loading={false}
      />
    </TestWrapper>
  );

  return act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    return rendered;
  });
};

describe('ResultForm', () => {
  beforeEach(() => {
    mockUseResultInputs.mockReset();
  });

  it('shows tiebreaker controls for a tied cup match', async () => {
    const { container } = await renderResultForm();

    expect(container.querySelector('#decision')).toBeInTheDocument();
    expect(container.querySelector('#winnerSide')).toBeInTheDocument();
  });

  it('hides tiebreaker controls for a non-cup match', async () => {
    const { container } = await renderResultForm({}, { ...cupInputs, isCup: false });

    expect(container.querySelector('#decision')).not.toBeInTheDocument();
    expect(container.querySelector('#winnerSide')).not.toBeInTheDocument();
  });

  it('hides score controls for a future match', async () => {
    const { container } = await renderResultForm({ date: new Date('2099-01-01T12:00:00.000Z') });

    expect(container.querySelector('#homeGoals')).not.toBeInTheDocument();
    expect(container.querySelector('#awayGoals')).not.toBeInTheDocument();
    expect(container.querySelector('#awayTeam')).toBeInTheDocument();
  });

  it('hides opponent, score, and forfeit controls for a bye', async () => {
    const { container } = await renderResultForm({ isBye: true, awayTeam: '' });

    expect(container.querySelector('#awayTeam')).not.toBeInTheDocument();
    expect(container.querySelector('#homeGoals')).not.toBeInTheDocument();
    expect(container.querySelector('#awayGoals')).not.toBeInTheDocument();
    expect(container.querySelector('#isForfeit')).not.toBeInTheDocument();
  });
});
