import { ITempMatch } from '../../../types';
export const initialMatchState: ITempMatch = {
  _id: '',
  teamId: '',
  seasonId: '',
  teamName: '',
  opponentId: '',
  opponentName: '',
  competitionId: '',
  competition: null,
  date: new Date().toString(),
  isHome: true,
  teamGoals: 0,
  opponentGoals: 0,
  leaguePosition: 1,
  cupRound: '',
  isForfeit: false,
  matchPlayers: [],
};
