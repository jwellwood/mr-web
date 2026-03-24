import { initialResultState } from '../result/state';
import type { BatchResultFormData } from './validation';

export const initialBatchResultState = (orgSeasonId?: string): BatchResultFormData =>
  ({
    date: initialResultState.date,
    kickoffTime: initialResultState.kickoffTime,
    orgSeasonId: orgSeasonId || initialResultState.orgSeasonId,
    gameWeek: initialResultState.gameWeek,
    competitionId: initialResultState.competitionId,
    matches: [
      {
        homeTeam: '',
        awayTeam: '',
        kickoffTime: initialResultState.kickoffTime,
      },
    ],
  }) as BatchResultFormData;
