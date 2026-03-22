import { initialResultState } from '../result/state';
import type { BatchResultFormData } from './validation';

export const initialBatchResultState = (orgSeasonId?: string): BatchResultFormData =>
  ({
    date: initialResultState.date,
    orgSeasonId: orgSeasonId || initialResultState.orgSeasonId,
    gameWeek: initialResultState.gameWeek,
    competitionId: initialResultState.competitionId,
    matches: [
      {
        homeTeam: '',
        awayTeam: '',
      },
    ],
  }) as BatchResultFormData;
