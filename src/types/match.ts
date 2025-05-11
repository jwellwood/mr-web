import type { ICompetition } from './organization';
import type { IPlayer } from './player';
import type {IPlayerInMatch} from './playerInMatch';
import type { ITeam } from './team';

export interface IMatch {
    _id: string;
    teamId: string;
    date: string;
    competitionId: string;
    seasonId: string;
    opponentId: string;
    teamGoals: number;
    opponentGoals: number;
    isHome: boolean;
    leaguePosition: number;
    cupRound: string;
    isForfeit: boolean;
    matchPlayers: Partial<IPlayerInMatch>[];
}

interface IMatchPlayer extends Omit<IPlayerInMatch, 'playerId'> {
    playerId: Pick<IPlayer, "_id" | "name" | "position">;
}

export interface IMatchResponse
    extends Omit<
        IMatch,
        'teamId' | 'opponentId' | 'matchPlayers' | 'competitionId'
    > {
    opponentId: string | ITeam;
    teamId: string | ITeam;
    competitionId: string | ICompetition;
    matchPlayers: IMatchPlayer[];
}

export interface IPlayerResponse extends Omit<IPlayerInMatch, 'playerId'> {
    playerId: string | IPlayer;
}

export interface ITempMatch extends IMatch {
    teamName: string;
    opponentName: string;
    competition: ICompetition | null;
}

export type MatchStatsKeys = keyof IMatch;

export interface IMostMatch {
    _id: string;
    opponent: string;
    opponentId: string;
    teamGoals: number;
    opponentGoals: number;
    date: string;
    isHome: boolean;
}
