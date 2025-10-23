import { Route } from 'react-router-dom';
import { MATCH, TEAM } from '../paths';
import { AWARD_ROUTES } from './AWARD_ROUTES.tsx';
import { PLAYER_ROUTES } from './PLAYER_ROUTES.tsx';
import { MATCH_ROUTES } from './MATCH_ROUTES.tsx';
import { DeleteTeam, EditBadge, EditTeam, Team } from '../../modules/team/routes.ts';
import { AddPlayer } from '../../modules/players/routes.ts';
import {
  AddTeamSeason,
  AddTrophy,
  EditTeamSeason,
  EditTrophy,
  Season,
  Trophy,
} from '../../modules/history/routes.ts';
import { AddMatch } from '../../modules/matches/routes.ts';

export const TEAM_ROUTES = () => (
  <>
    <Route index={true} element={<Team />} />
    <Route path={TEAM.ADD_PLAYER} element={<AddPlayer />} />
    <Route path={TEAM.SEASON}>
      <Route index={true} element={<Season />} />
      {AWARD_ROUTES()}
      {PLAYER_ROUTES()}
      {MATCH_ROUTES()}
    </Route>
    <Route path={TEAM.ADD_SEASON} element={<AddTeamSeason />} />
    <Route path={TEAM.EDIT_SEASON} element={<EditTeamSeason />} />
    <Route path={TEAM.TROPHY} element={<Trophy />} />
    <Route path={TEAM.ADD_TROPHY} element={<AddTrophy />} />
    <Route path={TEAM.EDIT_TROPHY} element={<EditTrophy />} />
    <Route path={MATCH.ADD_MATCH} element={<AddMatch />} />
    <Route path={TEAM.EDIT_BADGE} element={<EditBadge />} />
    <Route path={TEAM.EDIT} element={<EditTeam />} />
    <Route path={TEAM.DELETE_TEAM} element={<DeleteTeam />} />
  </>
);
