import { ISelectOptions } from '../../components/inputs/SelectInput';
import { IMatch, IPlayerInMatch } from '../../../types';
export const PAGES = {
  MATCH: 'Match',
  ADD_MATCH: 'Add Match',
  EDIT_MATCH: 'Edit Match',
  DELETE_MATCH: 'Delete Match',
};

export const initialMatchState: Partial<IMatch> = {
  opponentId: '',
  competitionId: '',
  seasonId: '',
  date: new Date().toString(),
  isHome: true,
  teamGoals: 0,
  opponentGoals: 0,
  leaguePosition: 1,
  cupRound: '',
  matchPlayers: [],
};

export const initPlayerInMatch: Partial<IPlayerInMatch> = {
  isStarter: true,
  minutes: 0,
  goals: 0,
  assists: 0,
  ownGoals: 0,
  conceded: 0,
  pensScored: 0,
  pensMissed: 0,
  pensSaved: 0,
  cleanSheet: false,
  mvp: false,
  yellowCards: 0,
  redCard: false,
};

export const emptySelectOption = { label: '', value: '' };

export const cupRoundOptions: ISelectOptions[] = [
  { label: '', value: '' },
  { label: 'Group', value: 'Group' },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: 'Quarter-Final', value: 'Quarter-Final' },
  { label: 'Semi-Final', value: 'Semi-Final' },
  { label: 'Final', value: 'Final' },
];
